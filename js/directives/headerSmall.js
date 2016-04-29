app.directive('headerSmall',['$document',function($document){
	return {
		link:function(scope,elem,attrs){
			elem.find = find;
			var sliderIcon = angular.element(elem.children()[1]); 
			var searchIcon = angular.element(elem.children()[2]);
			var textContainer = angular.element(elem.children()[3]);
			var sliderContainer = angular.element(elem.children()[4]);


			var textInput = angular.element(angular.element(textContainer.children()[0]).children()[1]);

			textContainer.on('click',function(e){
				e.stopPropagation();
			})
			textContainer.on('mouseenter',function(e){
				textInput.addClass('active');
			})

			$document.on('click',function(){
				textInput.removeClass('active');
			})



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
}])