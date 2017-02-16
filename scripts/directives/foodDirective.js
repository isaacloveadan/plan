app.directive('fooditems',function(){
  return{
    restrict:'EA',
    templateUrl:'widgets/fooditems.html',
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
// app.directive('repeatdone2', function() {
//     return {
//         restrict: 'EA',
//         replace: false,
//         scope: false,
//         link: function(scope, iElement, iAttrs, transclude) {
//             if (scope.$last === true) {
//                 angular.element(".slides").slidesjs({
//                     navigation: {
//                         active: false,
//                         effect: "slide"
//                     },
//                     width: 940,
//                     height: 528,
//                     play: {
//                         active: false,
//                         effect: "slide",
//                         interval: 3000,
//                         // [number] Time spent on each slide in milliseconds.
//                         auto: true,
//                         // [boolean] Start playing the slideshow on load.
//                         swap: false,
//                         // [boolean] show/hide stop and play buttons
//                         pauseOnHover: false,
//                         // [boolean] pause a playing slideshow on hover
//                         restartDelay: 2500
//                             // [number] restart delay on inactive slideshow
//                     },
//                     pagination: {
//                         active: true,
//                         // [boolean] Create pagination items.
//                         // You cannot use your own pagination. Sorry.
//                         effect: "slide"
//                             // [string] Can be either "slide" or "fade".
//                     }
//                 });
//                 angular.element('.slidesjs-pagination-item a').text('');
//             }
//         }
//     }
// })
