app.directive('holefill',['$mdMedia','$compile','$timeout','secondarySearch','topicsBar','searchCriteria','inventory',function($mdMedia,$compile,$timeout,secondarySearch,topicsBar,criteria,inventory){
	var firstSearch = false;
	return{
		restrict:'A',
		link:function(scope,elem,attrs){
			scope.$on('searchdone',function(){
				reArrange();
			})
			scope.$watch(function(){return $mdMedia('lg'); }, function(val){
				if(val) doBroadCast();
			});
			scope.$watch(function(){return $mdMedia('md'); }, function(val){
				if(val) doBroadCast();
			});
			scope.$watch(function(){return $mdMedia('sm'); }, function(val){
				if(val) doBroadCast();
			});
			scope.$watch(function(){return $mdMedia('xs'); }, function(val){
				if(val) doBroadCast();
			});
			function doBroadCast(){
				if(elem.children().length==0){
					return;
				}
				scope.$broadcast('searching');
			}
			function reArrange(){
				if($mdMedia('xs')){
					scope.wholeSearch = false;
					return;
				}
				if(elem.children().length==0){
					scope.wholeSearch = false;
					return;
				}
				var thePositions = [];
				var tiles=[];
				angular.forEach(elem.children(),function(e){
					tiles.push(angular.element(e));
				})
				var noCols = columnGetter();
				var noRows = rowGetter(noCols,tiles);
				var tilePositions = getTilePositions(tiles);
				var missingSpots = findMissingSpots(noCols,noRows,tilePositions);
				addTiles(missingSpots,noCols,noRows);
			}
			function columnGetter(){
				if($mdMedia('xs')){
					return 1;
				}else if($mdMedia('sm')){
					return 3;
				}else if($mdMedia('md')){
					return 5;
				}else if($mdMedia('gt-md')){
					return 7;
				}
			}
			function rowGetter(noCols,tiles){
				var Ys = [];
				if (tiles.length<noCols){
					for(var i = 0 ; i<tiles.length;i++){
						var theTile = tiles[i];
						var theY = yGetter(theTile);
						var height = parseInt(theTile.attr('md-rowspan'));
						Ys.push(theY+height-1);
					}
				}else{
					for (var i = 0 ; i < noCols; i ++){
						var theTile = tiles[tiles.length-noCols+i];
						var theY = yGetter(theTile);
						var height = parseInt(theTile.attr('md-rowspan'));
						Ys.push(theY+height-1);
					}	
				}
				return maxInArray(Ys);
			}
			function maxInArray(arr){
				var num = arr[0];
				for (var i = 1; i < arr.length; i++){
					if(num<arr[i]) num=arr[i];
				}
				return num;
			}
			function yGetter(elem){
				var theStyle = elem.css('marginTop');
				var starIndex = theStyle.indexOf('*');
				var theY = parseInt(theStyle.slice(starIndex+2,theStyle.length));
				return theY+1;
			}
			function xGetter(elem){
				var theStyle = elem.css('left');
				var starIndex = theStyle.indexOf('*');
				var theX = parseInt(theStyle.slice(starIndex+2,theStyle.length));
				return theX+1;
			}
			function getTilePositions(tiles){
				var arr = [];
				angular.forEach(tiles,function(e){
					arr.push({
						position:{
							x: xGetter(e),
							y: yGetter(e)
						},
						dimensions:{
							rowspan: parseInt(e.attr('md-rowspan')),
							colspan: parseInt(e.attr('md-colspan'))
						}
					})
				})
				return arr;
			}
			function findMissingSpots(noCols,noRows,tilePositions){
				var map=[];
				var missingSpots=[];
				var cols=[];
				for (var i =0;i<noCols;i++){
					for (var j = 0; j <noRows;j++){
						cols.push(0);
					}
					map.push(cols);
					cols=[];
				}

				angular.forEach(tilePositions,function(e){
					for(var i = e.position.x-1; i<e.position.x-1+e.dimensions.colspan;i++){
						for (var j = e.position.y-1;j<e.position.y-1+e.dimensions.rowspan;j++){
							map[i][j]=1;
						}
					}
				});

				for(var i=0;i<noCols;i++){
					for(var j=0;j<noRows;j++){
						if(map[i][j] == 0){
							missingSpots.push({
								position:{
									x: i+1,
									y: j+1
								}
							})
						}
					}
				};
				return missingSpots;
			}

			function addTiles(missingSpots,noCols,noRows){
				var numberMissing=missingSpots.length;
				// secondarySearch(numberMissing).then(function success(response){
				// 	if(numberMissing==0){
				// 		scope.wholeSearch = false;
				// 		return;
				// 	}
				// 	response.data.response.results.forEach(function(elem){
				// 		var topic = elem.sectionName;
				// 		var topicId = elem.sectionId;
				// 		elem.topic = topic;
				// 		if(!topicsBar.hasTopic(topic)){
				// 			topicsBar.addTopic(topic,topicId);
				// 		}
				// 	});
				// 	response.data.response.results.forEach(function(elem){
				// 		var tile = {
				// 			background:topicsBar.setColor(elem.topic),
				// 			span:{
				// 				row: 1,
				// 				col: 1
				// 			},
				// 			article: {
				// 				title:   elem.webTitle,
				// 				image:   elem.fields.thumbnail,
				// 				link:    elem.webUrl,
				// 				date:    elem.webPublicationDate,
				// 				topic:   elem.topic,
				// 				content: elem.fields.body
				// 			}
				// 		}
				// 		scope.tiles.push(tile);
				// 	})
				// 	$timeout(function(){
				//     	var elems = [];
				//     	angular.forEach(elem.children(),function(e,i){
				//     		if(i>elem.children().length-missingSpots.length-1){
				//     			elems.push(angular.element(e));
				//     		}
				//     	})
				//     	angular.forEach(missingSpots,function(e,i){
				//     		cssSetter(elems[i],e.position.x,e.position.y,noCols);
				//     	})
				//     	containerPaddingSetter(noCols,noRows);
				//     	scope.wholeSearch = false;
				//     },20);
				// })
				inventory(numberMissing).then(function success(response){
					if(numberMissing==0){
						scope.wholeSearch = false;
						return;
					}
					if(response.data.data.length<numberMissing){
						scope.wholeSearch = false;
						return;
					}
					response.data.data.forEach(function(elem){
						var topic = elem.topics[0];
						if(!topicsBar.hasTopic(topic)){
				 			topicsBar.addTopic(topic);
						}
					});
					scope.$apply(function(){
						response.data.data.forEach(function(elem){
							var tile = {
								background:topicsBar.setColor(elem.topics[0]),
								span:{
									row: 1,
									col: 1
								},
								article: {
									title:   elem.title,
									image:   elem.image,
									link:    elem.link,
									date:    elem.date,
									topics:   elem.topics,
									content: elem.raw_content
								}
							}
							for(var i=0;i<tile.article.topics.length;i++){
								tile.article.topics[i]=mekUppCase(tile.article.topics[i]);
							}
							scope.tiles.push(tile);
						})
					});
					$timeout(function(){
				    	var elems = [];
				    	angular.forEach(elem.children(),function(e,i){
				    		if(i>elem.children().length-missingSpots.length-1){
				    			elems.push(angular.element(e));
				    		}
				    	});
				    	angular.forEach(missingSpots,function(e,i){
				    		cssSetter(elems[i],e.position.x,e.position.y,noCols);
				    	});
				    	containerPaddingSetter(noCols,noRows);
				    	scope.wholeSearch = false;
				    },50);
				})
			}
			function cssSetter(elem,x,y,noCols){
				switch(noCols){
					case 7:
						elem.css('marginTop','calc(((14.2857% - 3.42857px) + 4px) * '+(y-1)+')');
						elem.css('left','calc(((14.2857% - 3.42857px) + 4px) * '+(x-1)+')');
						break;
					case 5:
						elem.css('marginTop','calc(((20% - 3.2px) + 4px) * '+(y-1)+')');
						elem.css('left','calc(((20% - 3.2px) + 4px) * '+(x-1)+')');
						break;
					case 3:
						elem.css('marginTop','calc(((25% - 5.33333px) + 8px) * '+(y-1)+')');
						elem.css('left','calc(((33.3333% - 5.33333px) + 8px) * '+(x-1)+')');
						break;
					case 1:
						elem.css('marginTop','calc(((75% - 0px) + 8px) * '+(y-1)+')');
						elem.css('left','calc(((100% - 0px) + 8px) * '+(x-1)+')');
						break;
				}
			}
			function containerPaddingSetter(noCols,noRows){
				switch(noCols){
					case 7:
						elem.css('paddingBottom','calc(((14.2857%% - 3.42857px) * ' + noRows + ') + 20px)');
						break;
					case 5:
						elem.css('paddingBottom','calc(((20% - 3.2px) * ' + noRows + ') + 20px)');
						break;
					case 3:
						elem.css('paddingBottom','calc(((20% - 3.2px) * ' + noRows + ') + 20px)')
						break;
					case 1:
						elem.css('paddingBottom','calc(((75% - 0px) * ' + noRows + ') + 216px)');
						break;
				}
			}
			function mekUppCase(e){
				var theWords = e.split(' ');
				for(var i = 0; i < theWords.length; i++){
					theWords[i] = theWords[i].substr(0,1).toUpperCase() + theWords[i].substr(1);
				}
				return theWords.join(' ');
			}
		}
	}
}])