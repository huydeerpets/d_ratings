var renderUnboundRating2 = function(rating) {
  var stars = ''
  var roundvalue = Math.round(rating)*10
    var value = rating*10,
  
		star = '<div class="lens-rating"><span class="rating-'+roundvalue +'" id="reviewsbar" style=" width:'+value +'%" max="100"><span class="exact-rating">'+rating+'/10</span></span></div>';
	
		
		stars = stars.concat(star)

	return '<span class="total-review-rating">' + stars + '</span>';
};

export default renderUnboundRating2;