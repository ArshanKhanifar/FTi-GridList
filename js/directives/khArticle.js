app.directive('khArticle',['$timeout','fbShare',function($timeout,fbShare){
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

				
				var shareButton = angular.element('<div></div>').addClass('shareButton').html('<img src="img/share.svg" alt="share on social media!">');
				var facebookButton = angular.element('<div></div>').addClass('facebookButton').html('<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><path d="M296.296,512H200.36V256h-64v-88.225l64-0.029l-0.104-51.976C200.256,43.794,219.773,0,304.556,0h70.588v88.242h-44.115	c-33.016,0-34.604,12.328-34.604,35.342l-0.131,44.162h79.346l-9.354,88.225L296.36,256L296.296,512z"/></g></svg>').on('click',function(){fbShare(scope.tile.article.link)});				
				var twitterButton = angular.element('<div></div>').addClass('twitterButton').html('<a href="https://twitter.com/intent/tweet?url='+scope.tile.article.link+'"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18.001 18.001" style="enable-background:new 0 0 18.001 18.001;" xml:space="preserve"><g>	<path d="M15.891,4.013c0.808-0.496,1.343-1.173,1.605-2.034c-0.786,0.417-1.569,0.703-2.351,0.861 c-0.703-0.756-1.593-1.14-2.66-1.14c-1.043,0-1.924,0.366-2.643,1.078C9.127,3.495,8.766,4.366,8.766,5.383 c0,0.309,0.039,0.585,0.117,0.819C5.807,6.097,3.261,4.821,1.255,2.365c-0.34,0.601-0.51,1.213-0.51,1.846 c0,1.301,0.549,2.332,1.645,3.089C1.765,7.247,1.214,7.089,0.745,6.83c0,0.929,0.273,1.705,0.82,2.388 c0.549,0.676,1.254,1.107,2.115,1.291c-0.312,0.08-0.641,0.118-0.979,0.118c-0.312,0-0.533-0.026-0.664-0.083 c0.23,0.757,0.664,1.371,1.291,1.841c0.625,0.472,1.344,0.721,2.152,0.743c-1.332,1.045-2.855,1.562-4.578,1.562 c-0.422,0-0.721-0.006-0.902-0.038c1.697,1.102,3.586,1.649,5.676,1.649c2.139,0,4.029-0.542,5.674-1.626 c1.645-1.078,2.859-2.408,3.639-3.974c0.784-1.564,1.172-3.192,1.172-4.892V5.341c0.758-0.57,1.371-1.212,1.84-1.921 C17.321,3.713,16.618,3.912,15.891,4.013z"/></g></svg></a>');
				var googlePlusButton = angular.element('<div></div>').addClass('googlePlusButton').html('<a href="https://plus.google.com/share?url='+scope.tile.article.link+'" target="_blank"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="533.333px" height="533.333px" viewBox="0 0 533.333 533.333" style="enable-background:new 0 0 533.333 533.333;" xml:space="preserve"><g> <path d="M291.18,41.358c0,0-104.665,0-139.552,0c-62.562,0-121.443,47.399-121.443,102.303 c0,56.107,42.647,101.388,106.296,101.388c4.426,0,8.727-0.088,12.938-0.392c-4.13,7.909-7.084,16.817-7.084,26.064 c0,15.592,8.387,28.233,18.994,38.554c-8.014,0-15.751,0.232-24.194,0.232C59.645,309.508,0,358.863,0,410.041 c0,50.406,65.386,81.934,142.882,81.934c88.346,0,137.139-50.127,137.139-100.535c0-40.417-11.925-64.621-48.795-90.695 c-12.612-8.928-36.735-30.644-36.735-43.408c0-14.958,4.269-22.327,26.786-39.919c23.079-18.034,39.413-43.386,39.413-72.873 c0-35.107-15.635-69.322-44.985-80.611h44.247L291.18,41.358z M242.438,382.742c1.107,4.673,1.71,9.483,1.71,14.39 c0,40.729-26.246,72.559-101.549,72.559c-53.563,0-92.248-33.908-92.248-74.637c0-39.918,47.982-73.147,101.544-72.568 c12.5,0.132,24.15,2.144,34.724,5.567C215.694,348.275,236.554,359.699,242.438,382.742z M156.676,230.825 c-35.958-1.075-70.124-40.222-76.33-87.427c-6.207-47.222,17.901-83.355,53.848-82.287c35.942,1.081,70.124,38.966,76.332,86.176 C216.728,194.506,192.616,231.901,156.676,230.825z M433.333,141.358v-100H400v100H300v33.333h100v100h33.334v-100h100v-33.333 H433.333z"/></g></svg></a>');
				var shareContainer = angular.element('<div></div>').addClass('shareContainer').addClass('clearfix');
				var wideContainer = angular.element('<div></div>').addClass('wideContainer');
				var gradientBottom = angular.element('<div></div>').addClass('gradientBottom');
				var marginTop = angular.element('<div></div>').addClass('marginTop');
				article.prepend(marginTop);
				article.prepend(gradientBottom);


				wideContainer.append(shareButton);
				wideContainer.append(facebookButton);
				wideContainer.append(twitterButton);
				wideContainer.append(googlePlusButton);

				shareContainer.append(wideContainer);

				article.append(shareContainer);


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
					var family = elem.parent().children();
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