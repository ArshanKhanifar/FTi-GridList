app.factory('searcher', ['searchCriteria','searchArticle','topicsBar','inventory','$mdMedia', function(criteria,searchArticle,topicsBar,inventory,$mdMedia){
	return function(){
		var promise = new Promise(function(resolve,reject){ 
			var theResults = [];
			inventory().then(function success(response){
				// if (response.data.response.results.length==0){
				// 	resolve(theResults);
				// 	return;
				// }
				// response.data.response.results.forEach(function(elem){
				// 	var topic = elem.sectionName;
				// 	var topicId = elem.sectionId;
				// 	elem.topic = topic;
				// 	if(!topicsBar.hasTopic(topic)){
				// 		topicsBar.addTopic(topic,topicId);
				// 	}
				// });
				// response.data.response.results.forEach(function(elem){
				// 	var tile = {
				// 		background:topicsBar.setColor(elem.topic),
				// 		span:{
				// 			row: Math.ceil(Math.random()*2),
				// 			col: Math.ceil(Math.random()*2)
				// 		},
				// 		article: {
				// 			title:   elem.webTitle,
				// 			image:   elem.fields.thumbnail,
				// 			link:    elem.webUrl,
				// 			date:    elem.webPublicationDate,
				// 			topic:   elem.topic,
				// 			content: elem.fields.body
				// 		}
				// 	}
				// 	theResults.push(tile);
				// })
				if (response.data.data.length==0){
					resolve(theResults);
					return;
				}
				response.data.data.forEach(function(elem){
					var topic = elem.topics[0]; 
					if(!topicsBar.hasTopic(topic)){
						topicsBar.addTopic(topic);
					}
				});
				response.data.data.forEach(function(elem){

					var tile = {
						background:topicsBar.setColor(elem.topics[0]),
						article: {
							title:   elem.title,
							image:   elem.image,
							link:    elem.link,
							date:    elem.date,
							topics:   elem.topics,
							content: elem.raw_content
						}
					}
					if(tile.article.image.length<4){
						tile.article.image = 'img/22.jpg';
					}
					if(!$mdMedia('xs')){
						tile.span = {
							row: Math.ceil(Math.random()*2),
							col: Math.ceil(Math.random()*2)
						}
					}else{
						tile.span = {
							row:1,
							col:1
						}
					}

					// var big = ((elem.size.width> myWidth) && (elem.size.height >myHeight));

					// if(big){
					// 	tile.span = {
					// 		row: Math.ceil(Math.random()*2),
					// 		col: 2
					// 	}
					// }else{
					// 	tile.span = {
					// 		row: Math.ceil(Math.random()*2),
					// 		col: 1
					// 	}	
					// }

					for(var i=0;i<tile.article.topics.length;i++){
						tile.article.topics[i]=mekUppCase(tile.article.topics[i]);
					}
					theResults.push(tile);
				})
				resolve(theResults);
			},function error(response){
				console.log(response.statusText)
			});

		});
		
		return promise;
	}
	function mekUppCase(e){
		var theWords = e.split(' ');
		for(var i = 0; i < theWords.length; i++){
			theWords[i] = theWords[i].substr(0,1).toUpperCase() + theWords[i].substr(1);
		}
		return theWords.join(' ');
	}

}])