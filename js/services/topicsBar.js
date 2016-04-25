app.factory('topicsBar',['searchCriteria',function(criteria){
	var colorPool = [];
	for (var i = 1 ; i <= 5 ; i++){
		var colorSet = [];
		for (var j = 1 ; j <= 11 ; j++){
			colorSet.push('color-'+i+'-'+j);
		}
		colorPool.push(colorSet);
	}
	return {
		colorPool:colorPool,
		// colorPool:['pink','blue','purple','orange','green','lime'],
		topics:[],
		topicPool:['Finance','London','Industry','New York','Startups','Bitchezz'],
		setColor:function(topic){
			var theColor;
			this.topics.forEach(function(e){
				if (e.topic == topic){
					theColor = e.color;
				}
			})
			return theColor;
		},
		randomTopic:function(){
			return this.topicPool[Math.floor(Math.random()*this.topicPool.length)];
		},
		hasTopic:function(topic){
			var val = false
			this.topics.forEach(function(e){
				if(e.topic == topic){
					val = true;
				}
			})
			return val;
		},
		addTopic:function(topic,topicId){
			this.topics.push({
				topic:topic,
				topicId:topicId,
				color:this.colorPool[criteria.colorSet].shift(),
				active:false,
				inactive:criteria.filtered,
			})
		},
		removeTopic:function(topic){ // not used yet! haven't found a use case either
			var topicsBar = this;
			var indexRemove; 
			topicsBar.topics.forEach(function(e,i){
				if(e.topic == topic){
					indexRemove = i;
					topicsBar.colorPool.push(e.color);
				}
			})
			topicsBar.topics.splice(indexRemove,1);
		},
		empty:function(){
			var topicsBar = this;
			topicsBar.topics.forEach(function(e,i){
				if(e.color!='undefined'){
					topicsBar.colorPool[criteria.colorSet].push(e.color);	
				}
			});
			topicsBar.topics.splice(0,topicsBar.topics.length);
		}
	}
}])