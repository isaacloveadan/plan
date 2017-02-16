app.controller('confirmController', ['$scope', '$state', '$cookieStore', 'myFactory', '$http', function($scope, $state, $cookieStore, myFactory, $http) {
    // 当前选中的旅游城市
    $scope.chosencities = [];
    $scope.chosencities = myFactory.chosencities;
    console.log($scope.chosencities);
    // 获取当前选中旅游城市的最后一个
    $scope.length = myFactory.chosencities.length;
    $scope.latestcity = myFactory.chosencities[$scope.length - 1]
    console.log($scope.latestcity);
    // 推荐城市列表
    var cities = [{
        name: '海口',
        days: 1,
    }, {
        name: '三亚',
        days: 1,
    }, {
        name: '万宁',
        days: 1,
    }, {
        name: '五指山',
        days: 1,
    }, {
        name: '文昌',
        days: 1,
    }, {
        name: '琼海',
        days: 1,
    }, {
        name: '儋州',
        days: 1,
    }, {
        name: '陵水',
        days: 1,
    }, {
        name: '东方市',
        days: 1,
    }, {
        name: '琼中',
        days: 1,
    }, {
        name: '保亭',
        days: 1,
    }, {
        name: '白沙',
        days: 1,
    }]
    var chosencities = new Array()
    for (var c = 0; c < $scope.chosencities.length; c++) {
        chosencities[c] = $scope.chosencities[c].name
    }
    for (var a = 0; a < cities.length; a++) {
        for (var b = 0; b < chosencities.length; b++) {
            if (cities[a].name == chosencities[b]) {
                cities.splice(a, 1)
            }
        }
    }
    console.log(cities)
    $scope.recommendcities = new Array()
    for (var d = 0; d < 5; d++) {
        $scope.recommendcities[d] = cities[d]
    }
    // 删除当前选中的旅游城市
    $scope.delete = function(num) {
        console.log(num);
        myFactory.chosencities.splice(num, 1)
        $scope.chosencities = myFactory.chosencities
        $scope.length = myFactory.chosencities.length;
        $scope.latestcity = myFactory.chosencities[$scope.length - 1]
        if (myFactory.chosencities.length < 6) {
            myFactory.plusif = true;
            $scope.plusif = myFactory.plusif;
        }
    }

    // 从推荐中加入选中的旅游城市
    $scope.addchosen = function(city) {
            $scope.length = myFactory.chosencities.length;
            if ($scope.length == 6) {
                // alert('不能再添加城市了')
                Showbo.Msg.alert('不能再添加城市了')
            } else {
                var citieslist = [];
                for (var p in myFactory.chosencities) {
                    citieslist[p] = myFactory.chosencities[p].name
                }
                console.log('当前已选中的城市:' + citieslist);
                if (citieslist.indexOf(city.name) == '-1') {
                    console.log('当前选中城市中没有所以添加上');
                    myFactory.chosencities.push(city)
                    $scope.chosencities = myFactory.chosencities
                    for (var c = 0; c < $scope.chosencities.length; c++) {
                        chosencities[c] = $scope.chosencities[c].name
                    }
                    for (var a = 0; a < cities.length; a++) {
                        for (var b = 0; b < chosencities.length; b++) {
                            if (cities[a].name == chosencities[b]) {
                                cities.splice(a, 1)
                            }
                        }
                    }
                    console.log(cities)
                    $scope.recommendcities = new Array()
                    for (var d = 0; d < 5; d++) {
                        $scope.recommendcities[d] = cities[d]
                    }
                    $scope.length = myFactory.chosencities.length;
                    $scope.latestcity = myFactory.chosencities[$scope.length - 1]
                    if (myFactory.chosencities.length == 6) {
                        myFactory.plusif = false;
                        $scope.plusif = myFactory.plusif;
                    }
                } else {
                    // alert('你已选过该城市了')
                    Showbo.Msg.alert('你已选过该城市了')
                }
            }
        }
        // 已选旅游城市后面加号的显示与否
    $scope.plusif = myFactory.plusif;
    // 下一步的点击事件
    $scope.next = function() {
        if (myFactory.chosencities.length == 0) {
            // alert('您还没有选择任何城市')
            Showbo.Msg.alert('您还没有选择任何城市')
        } else {
            $state.go('main.home.city.confirm.infor')
        }
    }
}])
