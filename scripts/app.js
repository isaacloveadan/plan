var app = angular.module('app', ['ui.router', 'ngCookies', 'ngSanitize']);

app.controller('indexController', ['$scope', '$state', 'myFactory', '$http', '$cookieStore', '$rootScope', function($scope, $state, myFactory, $http, $cookieStore, $rootScope) {
        myFactory.hainancity = [{
                name: '海口',
                days: 1,
                background: 'images/city1.png'
            }, {
                name: '三亚',
                days: 1,
                background: 'images/city2.png'
            }, {
                name: '万宁',
                days: 1,
                background: 'images/city3.png'
            }, {
                name: '五指山',
                days: 1,
                background: 'images/city4.png'
            }, {
                name: '文昌',
                days: 1,
                background: 'images/city5.png'
            }, {
                name: '琼海',
                days: 1,
                background: 'images/city6.png'
            }, {
                name: '儋州',
                days: 1,
                background: 'images/city7.png'
            }, {
                name: '陵水',
                days: 1,
                background: 'images/city8.png'
            }, {
                name: '东方市',
                days: 1,
                background: 'images/city9.png'
            }, {
                name: '琼中',
                days: 1,
                background: 'images/city10.png'
            }, {
                name: '保亭',
                days: 1,
                background: 'images/city11.png'
            }, {
                name: '白沙',
                days: 1,
                background: 'images/city12.png'
            }]
            // 标题栏的后退按钮点击事件
        $scope.back = function() {
                $state.go('^');
            }
            // console.log('当前url是'+$state.current.url);
            // 通过屏幕尺寸动态设置html fontsize大小
        var width = $(window).width();
        console.log(width);
        var fontsize = (width * 625) / 414;
        console.log(fontsize);
        angular.element('html').css('font-size', fontsize + '%')
            //     // 拿到Url参数
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        }
        // // 微信登录
        if ($cookieStore.get('islogin') == undefined || $cookieStore.get('islogin') == '') {
            location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a150a2811c36060&redirect_uri=http%3a%2f%2fplan.icloudinn.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
            $cookieStore.put('islogin', 1)
        }
        if ($cookieStore.get('islogin') == 1) {
            var code = getUrlParam('code')
            console.log('code=' + code)
            if (code == null) {
                location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a150a2811c36060&redirect_uri=http%3a%2f%2fplan.icloudinn.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
            } else {
                var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx4a150a2811c36060&secret=9ead653f73e65552b7676649aa70879a&code=" + code + "&grant_type=authorization_code";
                console.log(url);
                $http({
                    url: 'http://plan.icloudinn.com/zoule/index.php/Home/login/getUserInfo',
                    method: 'GET',
                    params: {
                        'code': code,
                        'state': 'STATE'
                    }
                }).success(function(data, header, config, status) {
                    console.log('success');
                    myFactory.userinfo = data.data
                    console.log(data);
                    // 当前用户在数据库的id
                    myFactory.userid=data.data.id
                    // 用户头像
                    $rootScope.userimg = myFactory.userinfo.img
                        // 用户昵称
                    $rootScope.username = myFactory.userinfo.nickname
                        // 中间大致数据
                        //哪几个城市行
                    $scope.firstcity2 = myFactory.userinfo.info[0].cheng;
                    $scope.lastcity2 = myFactory.userinfo.info[myFactory.userinfo.info.length - 1].cheng
                        // 背景
                    for (var a = 0; a < myFactory.hainancity.length; a++) {
                        if ($scope.firstcity2 == myFactory.hainancity[a].name) {
                            $scope.backgroundim = myFactory.hainancity[a].background
                            console.log($scope.backgroundim);
                        }
                    }
                    //几日行
                    $scope.days2 = 0;
                    for (var a = 0; a < myFactory.userinfo.info.length; a++) {
                        if (myFactory.userinfo.info[a].jing.length == 1) {
                            $scope.days2++
                        } else {
                            for (var b = 0; b < myFactory.userinfo.info[a].jing.length; b++) {
                                $scope.days2++
                            }
                        }
                    }
                    //详细行程
                    $scope.detailplans2 = myFactory.userinfo.info;
                    $scope.mydays2 = function(out, inout, len) {
                        if (out == 0) {
                            myFactory.m = 0;
                            return inout + 1;
                        }
                        if (out == 1) {
                            myFactory.m = len[0].jing.length
                            return inout + myFactory.m + 1
                        }
                        if (out == 2) {
                            myFactory.m = len[0].jing.length + len[1].jing.length
                            return inout + myFactory.m + 1
                        }
                        if (out == 3) {
                            myFactory.m = len[0].jing.length + len[1].jing.length + len[2].jing.length
                            return inout + myFactory.m + 1
                        }
                        if (out == 4) {
                            myFactory.m = len[0].jing.length + len[1].jing.length + len[2].jing.length + len[3].jing.length
                            return inout + myFactory.m + 1
                        }
                        if (out == 5) {
                            myFactory.m = len[0].jing.length + len[1].jing.length + len[2].jing.length + len[3].jing.length + len[4].jing.length
                            return inout + myFactory.m + 1
                        }
                    }
                }).error(function(data, header, config, status) {
                    console.log('error');
                    console.log(data);
                })
            }
        }
        // 微信分享配置
        $http({
            url: 'http://plan.icloudinn.com/zoule/index.php/Home/wx/shareSig',
            method: 'GET',
            params: {
                callUrl: location.href.split('#')[0]
            }
        }).success(function(data, header, config, status) {
            console.log('success');
            console.log(data);
                var timestamp = data.data.timestamp
                var nonceStr = data.data.nonceStr
                var signature = data.data.signature
                console.log(timestamp + nonceStr + signature);
                // 微信配置
                wx.config({
                    debug: false,
                    appId: "wx4a150a2811c36060",
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });
                wx.ready(function() {
                    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareTimeline({
                        title: '说走就走的秘密', // 分享标题
                        link: "http://plan.icloudinn.com/share/index.html?id="+myFactory.userid+"",
                        imgUrl: $rootScope.userimg // 分享图标
                    });
                    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                    wx.onMenuShareAppMessage({
                        title: '说走就走的秘密', // 分享标题
                        desc: '来看看'+$rootScope.username+'的'+$scope.firstcity2+'...'+$scope.lastcity2+$scope.days2+'日行程计划吧', // 分享描述
                        link: "http://plan.icloudinn.com/share/index.html?id="+myFactory.userid+"",
                        imgUrl: $rootScope.userimg, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                    });
                });
        }).error(function(data, header, config, status) {
            console.log('error');
            console.log(data);
        })
    }])
    // 标题栏的后退按钮显示与否
app.run(['$rootScope', '$location', '$cookieStore', '$state', function($rootScope, $location, $cookieStore, $state) {

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        console.log($location.path())
        if (toState.name == 'main.home') {
            $rootScope.backshow = false;
        } else {
            $rootScope.backshow = true;
        }
        if ($location.path() == '/home') {
            $rootScope.title = '懒人定制游'
            $rootScope.header = '懒人定制游'
        } else if ($location.path() == '/home/detail') {
            $rootScope.title = '详细行程';
            $rootScope.header = '详细行程'
        } else if ($location.path() == '/home/detail/views') {
            $rootScope.title = '产品详情页-景点';
            $rootScope.header = '产品详情页-景点'
        } else if ($location.path() == '/home/detail/food') {
            $rootScope.title = '产品详情页-美食';
            $rootScope.header = '产品详情页-美食';
        } else if ($location.path() == '/home/detail/house') {
            $rootScope.title = '产品详情页-酒店';
            $rootScope.header = '产品详情页-酒店'
        } else if ($location.path() == '/home/city') {
            $rootScope.title = '目的地城市';
            $rootScope.header = '目的地城市'
        } else if ($location.path() == '/home/city/confirm') {
            $rootScope.title = '目的地确认';
            $rootScope.header = '目的地确认'
        } else if ($location.path() == '/home/city/confirm/infor') {
            $rootScope.title = '基本信息';
            $rootScope.header = '基本信息'
        } else if ($location.path() == '/home/city/confirm/infor/startcity') {
            $rootScope.title = '出发城市'
            $rootScope.header = '出发城市'
        } else if ($location.path() == '/home/city/confirm/infor/backcity') {
            $rootScope.title = '返回城市'
            $rootScope.header = '返回城市'
        } else if ($location.path() == '/home/city/confirm/infor/choseroute') {
            $rootScope.title = '优化行程'
            $rootScope.header = '优化行程'
        } else if ($location.path() == '/home/city/confirm/infor/choseroute/dazhi') {
            $rootScope.title = '大致行程'
            $rootScope.header = '大致行程'
        }
    })
}]);
