app.directive('headerSmall',function(){
	return {
		link:function(scope,elem,attrs){
			var sliderIcon = angular.element(elem.children()[1]);
			var searchIcon = angular.element(elem.children()[2]);
			var textContainer = angular.element(elem.children()[3]);
			var sliderContainer = angular.element(elem.children()[4]);

			var sliderState = true;
			var searchState = true;

			sliderIcon.on('click',function(){
				if(sliderState){
					sliderContainer.addClass('active');
					sliderState = false;
				} else{
					sliderContainer.removeClass('active');
					sliderState = true;
				}
			});
			searchIcon.on('click',function(){
				if(searchState){
					textContainer.addClass('active');
					searchState = false;
				} else{
					textContainer.removeClass('active');
					searchState = true;
				}
			});
		}
	}
})