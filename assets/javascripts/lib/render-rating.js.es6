var renderUnboundRating = function(rating_array) {
  var stars = ''
  //var roundvalue = Math.round(rating)*10
    //var value = rating*10,
  
		var star = '<div class="topic-map"><section class="map map-collapsed2"><ul class="clearfix"><li class="secondary"><span class="number">'+rating_array[0]+'</span><h4>Sharpness</h4></li><li class="secondary"><span class="number">'+rating_array[1]+'</span><h4>Aberrations</h4></li><li class="secondary"><span class="number">'+rating_array[2]+'</span><h4>Bokeh</h4></li><li class="secondary"><span class="number">'+rating_array[3]+'</span><h4>Handling</h4></li><li class="secondary"><span class="number">'+rating_array[4]+'</span><h4>Value</h4></li></ul></section></div>';
		stars = stars.concat(star)

	return stars ;
};

export default renderUnboundRating;