app.factory('topicsBar',['searchCriteria',function(criteria){
	var colorPool = [];
	for (var i = 0 ; i < 27 ; i++){
		colorPool.push('color'+(i+1));
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
		addTopic:function(topic){
			this.topics.push({
				topic:topic,
				color:this.colorPool.shift(),
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
					topicsBar.colorPool.push(e.color);	
				}
			});
			topicsBar.topics.splice(0,topicsBar.topics.length);
		}
	}
}])