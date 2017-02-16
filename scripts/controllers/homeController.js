app.controller('homeController',['$scope','$state','myFactory',function($scope,$state,myFactory){
  // 侧边栏显示与否
  $scope.showslide =false;
  // 阴影
  $scope.shadow=false;

  // 点击主页我的
  $scope.clickmy = function(){
    $scope.showslide = true;
    $scope.shadow=true;
    angular.element('.homeInclude').css('overflow','hidden')
    // $('html').css('overflow','hidden')
  }
  // 点击其他地方隐藏侧边栏
  $scope.homecontent = function(){
      $scope.showslide = false;
      $scope.shadow=false;
      var then=function(){
      	angular.element('.homeInclude').css('overflow','')
      }
			then()
  }
  // 点击新旅程
  $scope.new = function(){
    myFactory.chosencities.splice(0,myFactory.chosencities.length)
    $state.go('main.home.city')
  }

}])
