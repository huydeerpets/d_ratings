var renderUnboundRating = function(rating,rating1,rating2,rating3,rating4,rating5) {
  var stars = ''
  var roundvalue = Math.round(rating)*10
    var value = rating*10,
  
		
		star = '<div class="topic-map"><section class="map map-collapsed"><ul class="clearfix"><li class="secondary"><span class="number">'+rating1+'</span><h4>Sharpness</h4></li><li class="secondary"><span class="number">'+rating2+'</span><h4>Aberrations</h4></li><li class="secondary"><span class="number">'+rating3+'</span><h4>Bokeh</h4></li><li class="secondary"><span class="number">'+rating4+'</span><h4>Handling</h4></li><li class="secondary"><span class="number">'+rating5+'</span><h4>Value</h4></li></ul></section></div>';
		stars = stars.concat(star)

	return '<span class="total-review-rating">' + stars + '</span>';
};

export default renderUnboundRating;
