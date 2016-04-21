app
  .controller('gridListDemoCtrl', ['$scope','searcher','$timeout','topicsBar','searchCriteria',function($scope,searcher,$timeout,topicsBar,criteria) {
    $scope.searching = false; 

    $scope.topics=[];

    $scope.updateTopicsBar = function(){
      $scope.topics = topicsBar.topics;
    };

    $scope.toggle = function(topic){
      var getsActive = false;
      var activeTopics = 0;
      $scope.topics.forEach(function(e){
        if(e.topic == topic){
          getsActive = !e.active;
        }
        if(e.active) activeTopics++;
      });

      $scope.topics.forEach(function(e){
        if(e.topic==topic){
          if(e.active){
            e.active = false; 
            if(activeTopics!=1){
              e.inactive = true;
            }
            // criteria.topic = '';
            criteria.removeTopic(e.topic);
            if(criteria.topics.length==0){
              criteria.filtered = false;
              criteria.type = 'global';
            }
            criteria.topicsBar = true;
            $scope.$broadcast('searching');
          }else{
            e.active = true; 
            e.inactive = false; 
            criteria.topics.push(e.topic);
            criteria.type = 'filtered';
            criteria.topicsBar = true;
            criteria.filtered = true;
            $scope.$broadcast('searching');
          }
        }else{
          if(e.active){
            e.inactive = false;
          }else if(getsActive){
            e.inactive = true;
          }else if(activeTopics==1){
            e.inactive = false;
          }else{
            e.inactive = true;
          }
        }

      })
    }

    $scope.$on('searching',function(javaScriptEvent){
      $scope.searching = true;
      $scope.tiles = [];
      if(!criteria.topicsBar) topicsBar.empty();
      $scope.updateTopicsBar();
      searcher()
      .then(function(theResults){
        $scope.searching = false;
        $scope.$apply();
        $scope.updateTopicsBar();
        var randomized = randomify(theResults);
        for (var i=0 ; i < randomized.length; i++){
          $scope.tiles.push(randomized[i]);
          if(i == randomized.length-1) $timeout(function(){$scope.$broadcast('searchdone');},130);
        }
        $scope.$apply();
      })
    })
  }])


function randomify(array){
  var arr = [];
  var l = array.length
  for(var i = 0 ; i < l; i++){
    var randpos = Math.floor(Math.random()*array.length);
    arr.push(array[randpos]);
    array.splice(randpos,1);
  }
  return arr;
}