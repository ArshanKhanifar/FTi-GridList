app.directive('topicLength',function(){
	return{
		link:function(scope,elem,attrs){
			var figure = angular.element(elem.children()[0]);
			var mainTopic = angular.element(figure.children()[0]);
			var secondTopic = angular.element(figure.children()[1]);
			var thirdTopic = angular.element(figure.children()[2]);

			var mainText = mainTopic.children()[0];
			var secondText = secondTopic.children()[0];
			var thirdText = thirdTopic.children()[0];



			elem.bind('mouseenter',function(){
				var mainWidth = mainText.getClientRects()[0].width;
				var secondWidth = secondText.getClientRects()[0].width;
				var thirdWidth = thirdText.getClientRects()[0].width;

				mainTopic.css('width',mainWidth/1.7 +'px');
				secondTopic.css('width',secondWidth/1 +'px');
				thirdTopic.css('width',thirdWidth/1 +'px');
			})
			elem.bind('mouseleave',function(){
				mainTopic.css('width','');
				secondTopic.css('width','');
				thirdTopic.css('width','');
			})


		}
	}
})