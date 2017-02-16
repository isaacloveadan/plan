app.directive('banner', function() {
    return {
        restrict: 'EA',
        templateUrl: 'widgets/banner.html',
        replace: false,
        scope: false,
        controller: function($scope) {

        },
        link: function(scope, iElement, iAttrs, transclude) {

        }
    }
})
app.directive('viewsdetail',function(){
  return{
    restrict:'EA',
    templateUrl:'widgets/viewsdetail.html',
    replace:false,
    scope:false,
    controller:function($scope,myFactory){
      // 底部更多图片
      var mySwiper = new Swiper('.swiper-container', {
          direction: 'vertical',
          prevButton: '.swiper-button-prev',
          slidesPerView: 3
      })
      angular.element('.swiper-wrapper').height('1.1633rem')
      angular.element('.swiper-slide').width('1.1652rem')
      angular.element('.swiper-slide').height('1.1633rem')
      angular.element('.swiper-slide div').width('1.1642rem')
      angular.element('.swiper-slide div').height('1.1633rem')
      // 景区详情页
      $scope.myview=myFactory.myview;

    },
    link:function(scope,iElement,iAttrs,transclude){

    }
  }
})
