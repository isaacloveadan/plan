app.controller('cityController', ['$scope', '$state', '$cookieStore', 'myFactory', function($scope, $state, $cookieStore, myFactory) {
    // 选择旅游城市的数据
    $scope.cities = myFactory.hainancity

    // lazyload
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        //下面是在table render完成后执行的js
        $(".lazy").lazyload();
    });

    // 点击之后的事件
    $scope.chosen = function(city) {
        $scope.length = myFactory.chosencities.length;
        if ($scope.length == 6) {
            // alert('你不能再添加城市了')
            Showbo.Msg.alert('你不能再添加城市了')
            myFactory.plusif = false;
            $state.go('main.home.city.confirm')
        } else {
            var citieslist = [];
            for (var p in myFactory.chosencities) {
                citieslist[p] = myFactory.chosencities[p].name
            }
            console.log('当前已选中的城市:' + citieslist);
            if (citieslist.indexOf(city.name) == '-1') {
                console.log('当前选中城市中没有所以添加上');
                myFactory.chosencities.push(city)
                console.log(myFactory.chosencities);
                if (myFactory.chosencities.length == 6) {
                    myFactory.plusif = false;
                }
                $state.go('main.home.city.confirm')
            } else {
                // alert('你已选过该城市了')
                Showbo.Msg.alert('你已选过该城市了')
            }
        }
    }

}])
