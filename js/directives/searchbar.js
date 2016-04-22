app.directive('searchbar',['$document',function($document){
	return{
		link:function(scope,element,attrs){
			var sliderImage = angular.element(element.children()[0]);
			var searchImage = angular.element(element.children()[1]);
			var searchInput = angular.element(element.children()[2]);
			var numberInput = angular.element(element.children()[3]);
			var state = true;
			sliderImage.on('click',function(){
				if(state){
					element.addClass('slider');
					state = false;
				}else{
					element.removeClass('slider');
					state = true;
				}
			});
			
		    element.on('mouseenter',function(e){
		    	element.addClass('active');
		    	searchInput.addClass('active');
		    	numberInput.addClass('active');
		    });
			element.on('mouseleave',function(e){
		    	searchInput.removeClass('active');
		    	element.removeClass('active');
		    	numberInput.removeClass('active');
		    	element.removeClass('slider');
		    });
		}
	}
}])
