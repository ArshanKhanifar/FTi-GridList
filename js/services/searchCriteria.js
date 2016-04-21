app.factory('searchCriteria',function(){
	return {
		searchText:'fintech',
		page:1,
		apiKeyArticle : '0575836f-d9c3-4472-9ee7-904248af6758',
		tileNum:13,
		topic:'',
		topics:[], //Array of topics
		type:'',
		topicsBar: false,
		filtered:false,
		removeTopic: function(topic){
			this.topics.splice(this.topics.indexOf(topic));
		},
		topicsString:function(){
			return this.topics.toString();
		}

	}
})