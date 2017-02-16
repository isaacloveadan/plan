app.controller('detailController', ['$scope', '$state', 'myFactory', '$http', '$stateParams', function($scope, $state, myFactory, $http, $stateParams) {
    // gotoview
    $scope.gotoview = function(elementObj) {
            var tempObj = elementObj;
            console.log(tempObj)
                // view
            console.log(elementObj.$$watchers[5].last);
            // city
            console.log(elementObj.$$watchers[6].last);
            $http({
                    url: 'http://plan.icloudinn.com/zoule/index.php/home/index/view_detail',
                    method: 'GET',
                    params: {
                        'view': elementObj.$$watchers[5].last,
                        'city': elementObj.$$watchers[6].last
                    }
                }).success(function(data, header, config, status) {
                    console.log('success')
                    console.log(data)
                    myFactory.myview = data.data;
                    console.log(myFactory.myview)
                    $state.go('main.home.detail.views')
                }).error(function(data, header, config, status) {
                    console.log('error')
                    console.log(data)
                })
                // $state.go('main.home.detail.views')
        }
        // 美食住宿背景
        // $scope.mystyle=function(imgurl){
        //     return{
        //         'background-image':'url('+imgurl+')'
        //     }
        // }

    // 上下午
    $scope.times = function(index) {
            if (index == 0) {
                return '上午'
            } else {
                return '下午'
            }
        }
        // 美食,住宿价格显示与否
    $scope.showcost = function(cost) {
            if (jQuery.isArray(cost) == true) {
                return false;
            } else {
                return true;
            }
        }
        // 天数
    $scope.mydays = function(out, inout, len) {
            if (out == 0) {
                myFactory.m = 0;
                $scope.mday = inout + 1;
                return inout + 1;
            }
            if (out == 1) {
                myFactory.m = len[0].jing.length
                $scope.mday = inout + myFactory.m + 1
                return inout + myFactory.m + 1
            }
            if (out == 2) {
                myFactory.m = len[0].jing.length + len[1].jing.length
                $scope.mday = inout + myFactory.m + 1
                return inout + myFactory.m + 1
            }
            if (out == 3) {
                myFactory.m = len[0].jing.length + len[1].jing.length + len[2].jing.length
                $scope.mday = inout + myFactory.m + 1
                return inout + myFactory.m + 1
            }
            if (out == 4) {
                myFactory.m = len[0].jing.length + len[1].jing.length + len[2].jing.length + len[3].jing.length
                $scope.mday = inout + myFactory.m + 1
                return inout + myFactory.m + 1
            }
            if (out == 5) {
                myFactory.m = len[0].jing.length + len[1].jing.length + len[2].jing.length + len[3].jing.length + len[4].jing.length
                $scope.mday = inout + myFactory.m + 1
                return inout + myFactory.m + 1
            }
        }
        // 交通显示与否
    var chengs = []
    if ($stateParams.which == 'old') {
        for (var a = 0; a < myFactory.userinfo.info.length; a++) {
            if (myFactory.userinfo.info[a].jing.length > 1) {
                for (var b = 0; b < myFactory.userinfo.info[a].jing.length; b++) {
                    chengs.push(myFactory.userinfo.info[a].cheng)
                }
            } else {
                chengs.push(myFactory.userinfo.info[a].cheng)
            }
        }
    } else if ($stateParams.which == 'new') {
        for (var a = 0; a < myFactory.myplan.length; a++) {
            if (myFactory.myplan[a].jing.length > 1) {
                for (var b = 0; b < myFactory.myplan[a].jing.length; b++) {
                    chengs.push(myFactory.myplan[a].cheng)
                }
            } else {
                chengs.push(myFactory.myplan[a].cheng)
            }
        }
    }
    $scope.chengss = chengs;
    $scope.istraffic = function(days) {
            if (days == chengs.length) {
                return false;
            } else {
                if (chengs[days - 1] == chengs[days]) {
                    return false;
                } else {
                    return true;
                }
            }
        }
        // lazyload
    $scope.$on('ngRepeatFinished2', function(ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
            setTimeout(function() {
                    $('div.hotelxing').raty({
                        starOn: '../../images/star-on.png',
                        starOff: '../../images/star-off.png',
                        starHalf: 'images/star-half.png',
                        score: function() {
                            return $(this).attr('data-score');
                        },
                        readOnly: true,
                        halfShow: true
                    });
                }, 1000)
                // 美食幻灯片
            angular.element(".slides").slidesjs({
                navigation: {
                    active: false,
                    effect: "slide"
                },
                width: 940,
                height: 528,
                play: {
                    active: false,
                    effect: "slide",
                    interval: 3000,
                    // [number] Time spent on each slide in milliseconds.
                    auto: false,
                    // [boolean] Start playing the slideshow on load.
                    swap: false,
                    // [boolean] show/hide stop and play buttons
                    pauseOnHover: false,
                    // [boolean] pause a playing slideshow on hover
                    restartDelay: 2500
                        // [number] restart delay on inactive slideshow
                },
                pagination: {
                    active: true,
                    // [boolean] Create pagination items.
                    // You cannot use your own pagination. Sorry.
                    effect: "slide"
                        // [string] Can be either "slide" or "fade".
                }
            });
            angular.element('.slidesjs-pagination-item a').addClass('extraa');
            // 住宿幻灯片
            angular.element(".slides2").slidesjs({
                navigation: {
                    active: false,
                    effect: "slide"
                },
                width: 940,
                height: 528,
                play: {
                    active: false,
                    effect: "slide",
                    interval: 3000,
                    // [number] Time spent on each slide in milliseconds.
                    auto: false,
                    // [boolean] Start playing the slideshow on load.
                    swap: false,
                    // [boolean] show/hide stop and play buttons
                    pauseOnHover: false,
                    // [boolean] pause a playing slideshow on hover
                    restartDelay: 2500
                        // [number] restart delay on inactive slideshow
                },
                pagination: {
                    active: true,
                    // [boolean] Create pagination items.
                    // You cannot use your own pagination. Sorry.
                    effect: "slide"
                        // [string] Can be either "slide" or "fade".
                }
            });
            angular.element('.slidesjs-pagination-item a').text('');
            angular.element('.slidesjs-pagination-item a').addClass('extraa');

            var title = [];
            var initTop = 0;
            var detailtitle = angular.element('.days span.bigspan')
            angular.element(window).scroll(function() {
                var scrollTop = angular.element(document).scrollTop();
                angular.element('.toptitle').css('display', 'flex')
                if (scrollTop > initTop) {
                    console.log("下");
                    for (var i = 0; i < detailtitle.length; i++) {
                        var num = detailtitle.eq(i).offset().top - angular.element(window).scrollTop()
                        if (num < 100) {
                            if (jQuery.inArray(detailtitle.eq(i).html(), title) == -1) {
                                title.push(detailtitle.eq(i).html())
                            }
                        }
                        myFactory.toptitle = title[title.length - 1]
                        $scope.$apply(function() {　　　　
                            $scope.toptitle = myFactory.toptitle;　　　　 //在这里去手动触发脏检查

                            angular.element('.toptitle h2').html('D' + $scope.toptitle)
                        })
                    }
                } else {
                    console.log("上");
                    var num = detailtitle.eq(title.length - 1).offset().top - angular.element(window).scrollTop()
                    if (num > 100) {
                        title.pop()
                    }
                    for (var i = 0; i < detailtitle.length; i++) {
                        var num = detailtitle.eq(i).offset().top - angular.element(window).scrollTop()
                        myFactory.toptitle = title[title.length - 1]
                        $scope.$apply(function() {　　　　
                            $scope.toptitle = myFactory.toptitle;　　　　 //在这里去手动触发脏检查

                            angular.element('.toptitle h2').html('D' + $scope.toptitle)
                        })
                    }
                }
                initTop = scrollTop;
            });
        $('div.hotelxing').raty({
            starOn: '../../images/star-on.png',
            starOff: '../../images/star-off.png',
            starHalf: 'images/star-half.png',
            score: function() {
                return $(this).attr('data-score');
            },
            readOnly: true,
            halfShow: true
        });
    });
}])
