app.factory('topicsBar',['searchCriteria',function(criteria){
	var colorPool = [];
	colorPool.push({
		light:makeColorSet(1,11,'light'),
		dark:makeColorSet(1,11,'dark')
	})
	colorPool.push({
		light:makeColorSet(2,11,'light'),
		dark:makeColorSet(2,11,'dark')
	})
	colorPool.push({
		light:makeColorSet(3,11,'light'),
		dark:makeColorSet(3,11,'dark')
	})
	colorPool.push({
		light:makeColorSet(4,11,'light'),
		dark:makeColorSet(4,11,'dark')
	})
	colorPool.push({
		light:makeColorSet(5,1,'light'),
		dark:makeColorSet(5,8,'dark')
	})

	function makeColorSet(i,n,brightness){
		var arr=[];
		for (var j = 1 ; j <= n ; j++){
			arr.push('color-'+i+'-'+j+'-'+brightness);
		}
		return arr
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
		upcomingColor:true,
		addTopic:function(topic,topicId){
			var topicObj = {
				topic:topic,
				topicId:topicId,
				active:false,
				inactive:criteria.filtered,
			};
			while(topicObj.color==undefined){
				if(this.upComingColor){
					topicObj.color = this.colorPool[criteria.colorSet].light.shift();
					topicObj.colorType = 'light';
				}else{
					topicObj.color = this.colorPool[criteria.colorSet].dark.shift();
					topicObj.colorType = 'dark';
				};
				this.upComingColor = !this.upComingColor;
			}

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