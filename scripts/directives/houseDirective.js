app.directive('houseitems',function(){
  return{
    restrict:'EA',
    templateUrl:'widgets/houseitems.html',
    replace:false,
    scope:false,
    controller:function($scope){
      // 底部更多图片
      var mySwiper = new Swiper('.swiper-container', {
          direction: 'vertical',
          prevButton: '.swiper-button-prev',
          slidesPerView: 3
      })
      angular.element('.swiper-wrapper').height('1.1633rem')
      angular.element('.swiper-slide').width('1.1642rem')
      angular.element('.swiper-slide').height('1.1633rem')
      angular.element('.swiper-slide div').width('1.1642rem')
      angular.element('.swiper-slide div').height('1.1633rem')
    },
    link:function(scope,iElement,iAttrs,transclude){

    }
  }
})
