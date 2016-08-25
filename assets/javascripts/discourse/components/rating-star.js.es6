export default Ember.Component.extend({
  tagName: "div",
  disabled: Ember.computed.not('enabled'),
  attributeBindings: [ "value", "checked:checked", "disabled:disabled"],

  
  didInsertElement: function() {
     Ember.$('.camera-lens-rating' ).replaceWith( '<span itemtype="http://schema.org/Review" itemscope=""><span itemtype="http://schema.org/Thing" itemscope="" itemprop="itemReviewed"><span itemprop="name">'+ this.get("fancy_title")+'</span>Rating by </span><span itemtype="http://schema.org/Person" itemscope="" itemprop="author"><span itemprop="name">'+this.get("last_poster_username")+'</span></span><span itemtype="http://schema.org/Rating" itemscope="" itemprop="reviewRating">:<span itemprop="ratingValue">'+this.get("rating")+'</span>/<span itemprop="bestRating">10</span></span><span itemtype="http://schema.org/Organization" itemscope="" itemprop="publisher"><meta content="LensShots.com" itemprop="name"></span></span><div class="camera-lens-rating" style="margin-top:1px;width: 200px; height: 19px; position: relative; background-color: #eee; color: rgb(0, 0, 0); "><div style="position: relative; float: left; padding-left: 3px; font-weight: bold;">Total Rating</div><div style="position: relative; float: right; padding-right: 3px; font-weight: bold;">'+this.get("rating")+'/10</div><span max="100" style="width: '+ this.get("rating")*10+'%;" id="reviewsbar" class="rating-' + Math.round(this.get("rating"))*10+ '"></span></div>' );
	 
	 Ember.$('.camera-lens-rating1').replaceWith('<div class="camera-lens-rating" style="margin-top:1px;width: 200px; height: 19px; position: relative; background-color: #eee; color: rgb(0, 0, 0); "><div style="position: relative; float:left;padding-left: 3px;">Sharpness</div><div style="position: relative; float: right; padding-right: 3px;">'+this.get("rating1")+'</div><span class="rating-' + Math.round(this.get("rating1"))*10+ '" id="reviewsbar" style="width:'+ this.get("rating1")*10+'%" max="100"></div>');
	 
	 Ember.$('.camera-lens-rating2').replaceWith('<div class="camera-lens-rating" style="margin-top:1px;width: 200px; height: 19px; position: relative; background-color: #eee; color: rgb(0, 0, 0); "><div style="position: relative; float:left;padding-left: 3px;">Aberrations</div><div style="position: relative; float: right; padding-right: 3px;">'+this.get("rating2")+'</div><span class="rating-' + Math.round(this.get("rating2"))*10+ '" id="reviewsbar" style="width:'+ this.get("rating2")*10+'%" max="100"></div>');
	 
	 Ember.$('.camera-lens-rating3').replaceWith('<div class="camera-lens-rating" style="margin-top:1px;width: 200px; height: 19px; position: relative; background-color: #eee; color: rgb(0, 0, 0); "><div style="position: relative; float:left;padding-left: 3px;">Bokeh</div><div style="position: relative; float: right; padding-right: 3px;">'+this.get("rating3")+'</div><span class="rating-' + Math.round(this.get("rating3"))*10+ '" id="reviewsbar" style="width:'+ this.get("rating3")*10+'%" max="100"></div>');
	 
	 Ember.$('.camera-lens-rating4').replaceWith('<div class="camera-lens-rating" style="margin-top:1px;width: 200px; height: 19px; position: relative; background-color: #eee; color: rgb(0, 0, 0); "><div style="position: relative; float:left;padding-left: 3px;">Handling</div><div style="position: relative; float: right; padding-right: 3px;">'+this.get("rating4")+'</div><span class="rating-' + Math.round(this.get("rating4"))*10+ '" id="reviewsbar" style="width:'+ this.get("rating4")*10+'%" max="100"></div>');
	 
	 Ember.$('.camera-lens-rating5').replaceWith('<div class="camera-lens-rating" style="margin-top:1px;width: 200px; height: 19px; position: relative; background-color: #eee; color: rgb(0, 0, 0); "><div style="position: relative; float:left;padding-left: 3px;">Value</div><div style="position: relative; float: right; padding-right: 3px;">'+this.get("rating5")+'</div><span class="rating-' + Math.round(this.get("rating5"))*10+ '" id="reviewsbar" style="width:'+ this.get("rating5")*10+'%" max="100"></div>');
	
  },

});
