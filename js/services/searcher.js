app.factory('searcher', ['searchCriteria','searchArticle','topicsBar', function(criteria,searchArticle,topicsBar){
	return function(){
		var promise = new Promise(function(resolve,reject){ 
			var theResults = [];
			searchArticle().then(function success(response){
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
				response.data.data.forEach(function(elem){
					var topic = elem.topics[0]; 
					if(!topicsBar.hasTopic(topic)){
						topicsBar.addTopic(topic);
					}
				});
				response.data.data.forEach(function(elem){
					var tile = {
						background:topicsBar.setColor(elem.topics[0]),
						span:{
							row: Math.ceil(Math.random()*2),
							col: Math.ceil(Math.random()*2)
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
					theResults.push(tile);
				})
				resolve(theResults);
			},function error(response){
				console.log(response.statusText)
			});

		});
		
		return promise;
	}

}])