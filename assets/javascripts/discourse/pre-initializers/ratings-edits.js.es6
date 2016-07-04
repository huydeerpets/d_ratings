import Topic from 'discourse/models/topic';
import TopicController from 'discourse/controllers/topic';
import TopicRoute from 'discourse/routes/topic';
import ComposerController from 'discourse/controllers/composer';
import ComposerView from 'discourse/views/composer';
import Composer from 'discourse/models/composer';
import Post from 'discourse/models/post';
import { registerUnbound } from 'discourse/lib/helpers';
import renderUnboundRating from 'discourse/plugins/discourse-ratings/lib/render-rating';
import renderUnboundRating2 from 'discourse/plugins/discourse-ratings/lib/render-rating2';
import { popupAjaxError } from 'discourse/lib/ajax-error';
import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'ratings-edits',
  initialize(){

    withPluginApi('0.1', api => {
      
	  api.includePostAttributes('rating1')
	  api.includePostAttributes('rating2')
	  api.includePostAttributes('rating3')
	  api.includePostAttributes('rating4')
	  api.includePostAttributes('rating5')
      api.decorateWidget('post-contents:before', function(helper) {
        var 
		rating1 = helper.attrs.rating1,
		rating2 = helper.attrs.rating2,
		rating3 = helper.attrs.rating3,
		rating4 = helper.attrs.rating4,
		rating5 = helper.attrs.rating5,
            showRating = helper.getModel().topic.show_ratings;
        if (showRating && rating1 && rating2 && rating3 && rating4 && rating5) {
	//var rating0 = 0
	var rating_array = [];
	rating_array.push(rating1)
	rating_array.push(rating2)
	rating_array.push(rating3)
	rating_array.push(rating4)
	rating_array.push(rating5)
	
          var html = new Handlebars.SafeString(renderUnboundRating(rating_array))
		  //var html = new Handlebars.SafeString(renderUnboundRating(rating1,rating2,rating3,rating4,rating5))
          return helper.rawHtml(`${html}`)
        }
      })
    });

    TopicController.reopen({
      refreshAfterTopicEdit: false,

      subscribeToRatingUpdates: function() {
        var model = this.get('model')
        if (model.show_ratings && model.get('postStream.loaded')) {
          this.messageBus.subscribe("/topic/" + model.id, function(data) {
            if (data.type === 'revised' && data.average !== undefined) {
              model.set('average_rating', data.average)
			  model.set('average_rating1', Math.round(data.average1))
			    model.set('average_rating2', Math.round(data.average2))
				model.set('average_rating3', Math.round(data.average3))
				model.set('average_rating4', Math.round(data.average4))
				model.set('average_rating5', Math.round(data.average5))
            }
          })
        }
      }.observes('model.postStream.loaded'),

      showRating: function() {
        if (this.get('model.average_rating') < 1) {return false} //Not show rating if average_rating <1
        if (!this.get('editingTopic')) {return this.get('model.show_ratings')}  // If not editing -> use default show_rating
        var category = this.site.categories.findProperty('id', this.get('buffered.category_id')),
            tags = this.get('buffered.tags'),
            ratingsVisible = Boolean((category && category.rating_enabled) || (tags && tags.indexOf('rating') > -1)); // showRating = true if config to rate
			
        if (ratingsVisible !== this.get('buffered.show_ratings')) {
          this.set('refreshAfterTopicEdit', true)
        }
        return ratingsVisible
      }.property('model.average_rating','model.average_rating1','model.average_rating2','model.average_rating3','model.average_rating4','model.average_rating5', 'model.show_ratings', 'buffered.category_id', 'buffered.tags'),

      refreshTopic: function() {
        if (!this.get('editingTopic') && this.get('refreshAfterTopicEdit')) {
          this.send('refreshTopic')
          this.set('refreshAfterTopicEdit', false)
        }
      }.observes('editingTopic'),

      toggleCanRate: function() {
        if (this.get('model')) {
          this.toggleProperty('model.can_rate')
        }
      }

    })

    TopicRoute.reopen({
      actions: {
        refreshTopic: function() {
          this.refresh();
        }
      }
    })

    Post.reopen({
      setRatingWeight: function() {
        if (!this.get('topic.show_ratings')) {return}
        var id = this.get('id'),
            weight = this.get('deleted') ? 0 : 1;
        Discourse.ajax("/rating/weight", {
          type: 'POST',
          data: {
            id: id,
            weight: weight
          }
        }).catch(function (error) {
          popupAjaxError(error);
        });
      }.observes('deleted')
    })

    ComposerController.reopen({
      //rating: null,
	  rating1: null,
	  rating2: null,
	  rating3: null,
	  rating4: null,
	  rating5: null,
      refreshAfterPost: false,
      includeRating: true,

      actions: {

        // overrides controller methods
        save() {
          var show = this.get('showRating');
          if (show && this.get('includeRating') && ( !this.get('rating1') || !this.get('rating2')|| !this.get('rating3')|| !this.get('rating4')|| !this.get('rating5'))) {
            return bootbox.alert(I18n.t("composer.select_rating"))
          }
          var model = this.get('model'),
              topic = model.get('topic'),
              post = model.get('post');
          if (topic && post && post.get('firstPost') &&
              (model.get('action') === Composer.EDIT) && (topic.show_ratings !== show)) {
            this.set('refreshAfterPost', true)
          }
          this.save()
        }

      },

      // overrides controller methods
      close() {
        this.setProperties({ model: null, lastValidatedAt: null, rating1: null, rating2: null, rating3: null, rating4: null, rating5: null });
        if (this.get('refreshAfterPost')) {
          this.send("refreshTopic")
          this.set('refreshAfterPost', false)
        }
      },

      onOpenSetup: function() {
        if (this.get('model.composeState') === Composer.OPEN) {
          this.set('includeRating', true)
        }
      }.on('willInsertElement').observes('model.composeState'),

      showRating: function() {
        var model = this.get('model')
        if (!model) {return false}
        var topic = model.get('topic'),
            post = model.get('post'),
            firstPost = Boolean(post && post.get('firstPost'));
        if ((firstPost && topic.can_rate) || !topic) {
          var category = this.site.categories.findProperty('id', model.get('categoryId')),
              tags = model.tags || (topic && topic.tags);
          return Boolean((category && category.rating_enabled) || (tags && tags.indexOf('rating') > -1));
        }
        if (topic.can_rate) {return true}
        return Boolean(topic.show_ratings && post && post.rating1 && post.rating2 && post.rating3 && post.rating4 && post.rating5  && (model.get('action') === Composer.EDIT))//&& post.rating
      }.property('model.topic', 'model.categoryId', 'model.tags', 'model.post'),

      setRating: function() {
        var model = this.get('model')
        if (!model || this.get('model.action') !== Composer.EDIT) {return null}
        var post = model.get('post')
        if (post && !this.get('rating1') && this.get('showRating')) {
         // this.set('rating', post.rating)
		  this.set('rating1', post.rating1)
		  
        }
		if (post && !this.get('rating2') && this.get('showRating')) {
         // this.set('rating', post.rating)
		  this.set('rating2', post.rating2)
		  
        }
		if (post && !this.get('rating3') && this.get('showRating')) {
         // this.set('rating', post.rating)
		  this.set('rating3', post.rating3)
		  
        }
		if (post && !this.get('rating4') && this.get('showRating')) {
         // this.set('rating', post.rating)
		  this.set('rating4', post.rating4)
		  
        }
		if (post && !this.get('rating5') && this.get('showRating')) {
         // this.set('rating', post.rating)
		  this.set('rating5', post.rating5)
		  
        }
		
      }.observes('model.post', 'showRating'),

      saveRatingAfterCreating: function() {
        if (!this.get('showRating') ||
            !this.get('includeRating')) {return}
        var post = this.get('model.createdPost')
        if (!post) {return}
        this.saveRating(post, this.get('rating1'),this.get('rating2'),this.get('rating3'),this.get('rating4'),this.get('rating5'))
        this.get('controllers.topic').toggleCanRate()
      }.observes('model.createdPost'),

      saveRatingAfterEditing: function() {
        if (!this.get('showRating')
            || this.get('model.action') !== Composer.EDIT
            || this.get('model.composeState') !== Composer.CLOSED) {return}
        var post = this.get('model.post')
        if (!post) {return}
        //var rating = this.get('rating');
		var rating1 = this.get('rating1');
		var rating2 = this.get('rating2');
		var rating3 = this.get('rating3');
		var rating4 = this.get('rating4');
		var rating5 = this.get('rating5');
        if (rating1 && rating2 && rating3 && rating4 && rating5 && !this.get('includeRating')) {
          this.removeRating(post)
          this.get('controllers.topic').toggleCanRate()
        } else {
          this.saveRating(post, rating1,rating2,rating3,rating4,rating5)
        }
      }.observes('model.composeState'),

      removeRating: function(post) {
        Discourse.ajax("/rating/remove", {
          type: 'POST',
          data: {
            id: post.id,
          }
        }).catch(function (error) {
          popupAjaxError(error);
        });
      },

      saveRating: function(post, rating1,rating2,rating3,rating4,rating5) {
        //post.set('rating', rating)
		post.set('rating1', rating1)
		post.set('rating2', rating2)
		post.set('rating3', rating3)
		post.set('rating4', rating4)
		post.set('rating5', rating5)
        Discourse.ajax("/rating/rate", {
          type: 'POST',
          data: {
            id: post.id,
            //rating: rating,
			rating1: rating1,
			rating2: rating2,
			rating3: rating3,
			rating4: rating4,
			rating5: rating5
          }
        }).catch(function (error) {
          popupAjaxError(error);
        });
      }

    })

    ComposerView.reopen({
      resizeIfShowRating: function() {
        if (this.get('composeState') === Composer.OPEN) {
          this.resize()
        }
      }.observes('controller.showRating')
    })

    registerUnbound('rating-unbound', function(rating) {
      return new Handlebars.SafeString(renderUnboundRating2(rating));
    });
	

  }
}
