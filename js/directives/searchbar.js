app.directive('searchbar',['$document',function($document){
	return{
		link:function(scope,element,attrs){
			var form = angular.element(element.children()[0]);
			var sliderImage = angular.element(form.children()[0]);
			var searchImage = angular.element(form.children()[1]);
			var searchInput = angular.element(form.children()[2]);
			var numberInput = angular.element(form.children()[3]);
			var state = true;
			form.on('click',function(e){
				e.stopPropagation();
			})
			sliderImage.on('click',function(e){
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
			$document.on('click',function(e){
		    	searchInput.removeClass('active');
		    	element.removeClass('active');
		    	numberInput.removeClass('active');
		    	element.removeClass('slider');
		    });
		}
	}
}])
