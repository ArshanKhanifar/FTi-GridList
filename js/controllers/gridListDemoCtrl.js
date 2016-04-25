app
  .controller('gridListDemoCtrl', ['$scope','searcher','$timeout','topicsBar','searchCriteria',function($scope,searcher,$timeout,topicsBar,criteria) {
    $scope.searching = false;
    $scope.wholeSearch = false;
    $scope.noResults = false;
    $scope.topics=[];

    $scope.updateTopicsBar = function(){
      $scope.topics = topicsBar.topics;
    };

    $scope.toggle = function(topic){
      criteria.page.val = 1;
      if(!$scope.wholeSearch){
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
    }

    $scope.$on('searching',function(javaScriptEvent){
      $scope.searching = true;
      $scope.wholeSearch = true;
      $scope.noResults = false;
      $scope.tiles = [];
      if(!criteria.topicsBar) topicsBar.empty();
      console.log(topicsBar);
      $scope.updateTopicsBar();
      searcher()
      .then(function(theResults){
        $scope.searching = false;
        if(theResults.length==0){
          $scope.noResults = true;
        }
        $scope.updateTopicsBar();
        var randomized = randomify(theResults);
        for (var i=0 ; i < randomized.length; i++){
          doPush($scope,randomized,100,i,$timeout);
        }
        $scope.$apply();
      })
    })
  }])
function doPush($scope,randomized,interval,i,$timeout){
  $timeout(function(){
    $scope.tiles.push(randomized[i]);
    if(i == randomized.length-1) $timeout(function(){$scope.$broadcast('searchdone');},40);    
  },interval*i)
}

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