app.directive('khArticle',['$timeout',function($timeout){
	return{
		link:function(scope,elem,attrs){
			elem.bind('click',function(e){
				var element = angular.element(this);
				var body = angular.element(document.getElementsByTagName('body')[0]);
				var square = angular.element('<div></div>');
				var article = angular.element('<div></div>');
				article.addClass('articleIn').addClass('articleFaded').html(scope.tile.article.content);


				body.append(article);

				var x = this.getClientRects()[0].left;
				var y = this.getClientRects()[0].top;

				var tileHeight = this.getClientRects()[0].height;
				var tileWidth  = this.getClientRects()[0].width;

				square.addClass('expandingSquare').addClass(scope.tile.background);
				var closeButton = angular.element('<div></div>');
				closeButton.addClass('articleCloseButton').html('<svg enable-background="new 0 0 100 100" id="Layer_1" version="1.1" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon fill="#010101" points="77.6,21.1 49.6,49.2 21.5,21.1 19.6,23 47.6,51.1 19.6,79.2 21.5,81.1 49.6,53 77.6,81.1 79.6,79.2   51.5,51.1 79.6,23 "/></svg>');
				article.addClass(scope.tile.background).prepend(closeButton);

				var facebookButton = angular.element('<div></div>');

				var twitterButton = angular.element('<div></div>');
				var googlePlusButton = angular.element('<div></div>');




				$timeout(function(){
					square.addClass('expandingSquare-in');
					article.removeClass('articleFaded');
				},10);

				square.css('left',x+'px').css('top',y+'px').css('height',tileHeight+'px').css('width',tileWidth+'px');
				body.append(square);
				element.addClass('faded');
				var bodyFamily = body.children();
				var squareInBody = angular.element(bodyFamily[bodyFamily.length-1]);
				squareInBody.css('left',x+'px').css('top',y+'px').css('height',tileHeight+'px').css('width',tileWidth+'px');

				square.bind('click',closeArticle);
				closeButton.bind('click',closeArticle);

				function closeArticle(){
					var elem = square;
					var family = elem.parent().children()
					var articleElem = angular.element(family[family.length-2]);
					articleElem.addClass('articleFaded-out');
					element.removeClass('faded');
					elem.removeClass('expandingSquare-in');
					elem.addClass('expandingSquare-out');
					$timeout(function(){
						elem.remove();
						articleElem.remove();
					},400);
				}
				
			})
		}
	}
}])