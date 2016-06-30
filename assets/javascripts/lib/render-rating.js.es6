var renderUnboundRating = function(rating,rating1,rating2,rating3,rating4,rating5) {
  var stars = ''
  var roundvalue = Math.round(rating)*10
    var value = rating*10,
  
		//star = '<div class="lens-rating"><span class="rating-'+roundvalue +'" id="reviewsbar" style="box-shadow:0 0 5px 0 #222 inset; width:'+value +'%" max="100"><span class="exact-rating">('+rating+')</span></span></div>';
		//stars = stars.concat('<span itemscope itemtype="http://schema.org/Review">');
 		//stars = stars.concat('<span itemprop="itemReviewed" itemscope itemtype="http://schema.org/Thing">');
        //star = stars.concat('<span itemprop="name">Super Book</span>');
		//stars = stars.concat('</span>');
		//stars = stars.concat('<span itemprop="author" itemscope itemtype="http://schema.org/Organization">');
		//stars = stars.concat('<span itemprop="name">lensshots.com'+rating1+ '-' + rating2 +'</span>');
		//stars = stars.concat(' </span>');
		//stars = stars.concat('<span itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">');
		//stars = stars.concat('rating:');
		//stars = stars.concat('<span itemprop="ratingValue">'+ rating+'</span> out of ');
		//stars = stars.concat('<span itemprop="bestRating">10</span>');
		//stars = stars.concat('</span>');
		//stars = stars.concat('<span itemprop="publisher" itemscope itemtype="http://schema.org/Organization">');
		//stars = stars.concat('<meta itemprop="name" content="LensShots.com">');
		//stars = stars.concat('</span>');
		//stars = stars.concat('</span>');
		star = '<div class="topic-map"><section class="map map-collapsed"><ul class="clearfix"><li class="secondary"><span class="number">'+rating1+'</span><h4>Sharpness</h4></li><li class="secondary"><span class="number">'+rating2+'</span><h4>Aberrations</h4></li><li class="secondary"><span class="number">'+rating3+'</span><h4>Bokeh</h4></li><li class="secondary"><span class="number">'+rating4+'</span><h4>Handling</h4></li><li class="secondary"><span class="number">'+rating5+'</span><h4>Value</h4></li></ul></section></div>';
		stars = stars.concat(star)

	return '<span class="total-review-rating">' + stars + '</span>';
};

export default renderUnboundRating;
