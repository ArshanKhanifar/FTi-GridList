app.factory('topicsBar',['searchCriteria',function(criteria){
	var colorPool = [];
	for (var i = 1 ; i <= 5 ; i++){
		var colorSet = {
			light:[],
			dark:[]
		};
		for (var j = 1 ; j <= 11 ; j++){
			colorSet.light.push('color-'+i+'-'+j+'-'+'light');
			colorSet.dark.push('color-'+i+'-'+j+'-'+'dark');
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
		upcomingColor:'light',
		addTopic:function(topic,topicId){
			var topicObj = {
				topic:topic,
				topicId:topicId,
				active:false,
				inactive:criteria.filtered,
			};
			if(this.upComingColor=='light'){
				topicObj.color = this.colorPool[criteria.colorSet].light.shift();
				topicObj.colorType = 'light';
				this.upComingColor='dark';
			}else{
				topicObj.color = this.colorPool[criteria.colorSet].dark.shift();
				topicObj.colorType = 'dark';
				this.upComingColor='light';
			};
			this.topics.push(topicObj);
		},
		removeTopic:function(topic){ // not used yet! haven't found a use case either
			var topicsBar = this;
			var indexRemove; 
			topicsBar.topics.forEach(function(e,i){
				if(e.topic == topic){
					indexRemove = i;
					if(e.topic.colorType=='light'){
						topicsBar.colorPool[criteria.colorSet].light.push(e.color);
					}else{
						topiscBar.colorPool[criteria.colorSet].dark.push(e.color);
					}
				}
			})
			topicsBar.topics.splice(indexRemove,1);
		},
		empty:function(){
			var topicsBar = this;
			topicsBar.topics.forEach(function(e,i){
				if(e.color!='undefined'){
					if(e.colorType=='light'){
						topicsBar.colorPool[criteria.colorSet].light.unshift(e.color);
					}else{
						topicsBar.colorPool[criteria.colorSet].dark.unshift(e.color);
					}
				}else{

				}
			});
			topicsBar.topics.splice(0,topicsBar.topics.length);
		}
	}
}])