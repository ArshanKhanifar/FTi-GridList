app.directive('khArticle',['$timeout',function($timeout){
	return{
		link:function(scope,elem,attrs){
			elem.bind('click',function(e){
				var element = angular.element(this);
				var body = angular.element(document.getElementsByTagName('body')[0]);
				var square = angular.element('<div></div>');
				var article = angular.element('<div></div>');
				article.addClass('articleIn');
				article.addClass('articleFaded').html(scope.tile.article.content);
				body.append(article);

				var x = this.getClientRects()[0].left;
				var y = this.getClientRects()[0].top;

				var tileHeight = this.getClientRects()[0].height;
				var tileWidth  = this.getClientRects()[0].width;


				square.addClass('expandingSquare').addClass(scope.tile.background);
				article.addClass(scope.tile.background);
				$timeout(function(){square.addClass('expandingSquare-in');
					article.removeClass('articleFaded')
				},10);

				square.css('left',x+'px').css('top',y+'px').css('height',tileHeight+'px').css('width',tileWidth+'px');
				body.append(square);
				element.addClass('faded');
				var bodyFamily = body.children();
				var squareInBody = angular.element(bodyFamily[bodyFamily.length-1]);
				squareInBody.css('left',x+'px').css('top',y+'px').css('height',tileHeight+'px').css('width',tileWidth+'px');

				square.bind('click',function(){
					var elem = angular.element(this);
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
				})
				
			})
		}
	}
}])