app.controller('dazhiController',['$scope','$state','myFactory',function($scope,$state,myFactory){
  //哪几个城市行
  $scope.firstcity=myFactory.chosencities[0].name;
  $scope.lastcity=myFactory.chosencities[myFactory.chosencities.length-1].name
  //几日行
  $scope.days=0;
  angular.element.each(myFactory.chosencities,function(index,item){
	  $scope.days=$scope.days+item.days
  })
  console.log($scope.days)
  //详细行程
  $scope.detailplans=myFactory.myplan;
  console.log($scope.detailplans)
  $scope.mydays=function(out,inout,len){
    if(out==0){
      myFactory.m=0;
      return inout+1;
    }
    if(out==1){
      myFactory.m=len[0].jing.length
      return inout+myFactory.m+1
    }
    if(out==2){
      myFactory.m=len[0].jing.length+len[1].jing.length
      return inout+myFactory.m+1
    }
    if(out==3){
      myFactory.m=len[0].jing.length+len[1].jing.length+len[2].jing.length
      return inout+myFactory.m+1
    }
    if(out==4){
      myFactory.m=len[0].jing.length+len[1].jing.length+len[2].jing.length+len[3].jing.length
      return inout+myFactory.m+1
    }
    if(out==5){
      myFactory.m=len[0].jing.length+len[1].jing.length+len[2].jing.length+len[3].jing.length+len[4].jing.length
      return inout+myFactory.m+1
    }
  }
}])
