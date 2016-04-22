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

			var theMainTextLength = scope.tile.article.topics[0].length
			var mainWidth;
			var secondWidth;
			var thirdWidth;

			setTimeout(function(){
				mainWidth = mainText.getClientRects()[0].width - (theMainTextLength)*16 + 14;
				secondWidth = secondText.getClientRects()[0].width + 14 ;
				thirdWidth = thirdText.getClientRects()[0].width + 14 ;
			},100)

			elem.bind('mouseenter',function(){
				mainTopic.css('width',mainWidth +'px');
				secondTopic.css('width',secondWidth +'px');
				thirdTopic.css('width',thirdWidth +'px');
			})
			elem.bind('mouseleave',function(){
				mainTopic.css('width','');
				secondTopic.css('width','');
				thirdTopic.css('width','');
			})


		}
	}
})