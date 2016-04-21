app.directive('searchbar',['$document',function($document){
	return{
		link:function(scope,element,attrs){
			var image = angular.element(element.children()[0]);
			var searchInput = angular.element(element.children()[1]);
			var numberInput = angular.element(element.children()[2]);
			var searchInputClicked = false;
			element.on('mousedown', function(event) {
		      // Prevent default dragging of selected content
				if(!searchInputClicked){
					element.addClass('active');
					dX = event.x - element[0].offsetLeft;
					dY = event.y - element[0].offsetTop;
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				}
		    });

		    function mousemove(event) {
				y = event.y - dY;
				x = event.x - dX;
				element.css({
					top: y + 'px',
					left:  x + 'px'
				});
		    }
			numberInput.on('mousedown', function(event) {
		    	searchInputClicked = true;
		    });
				numberInput.on('mouseup', function(event) {
		    	searchInputClicked = false;
		    });
			element.on('mouseup', function(){
				searchInputClicked = false;
			});
    
		    function mouseup() {
				searchInputClicked = false;
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
		    }
		    element.on('mouseenter',function(e){
		    	element.addClass('active');
		    	searchInput.addClass('active');
		    	numberInput.addClass('active');
		    })
			element.on('mouseleave',function(e){
		    	searchInput.removeClass('active');
		    	element.removeClass('active');
		    	numberInput.removeClass('active');
		    })
		}
	}
}])
var dX;
var dY;