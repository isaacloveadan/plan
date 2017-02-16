app.directive('slidemenu',function(){
  return{
    restrict:'EA',
    templateUrl:'widgets/slidemenu.html',
    replace:false,
    scope:false,
    controller:function($scope){
      // angular.element('.slidemenu').height($())
    },
    link:function(scope,iElement,iAttrs,transclude){

    }
  }
})
