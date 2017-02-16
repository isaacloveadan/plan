app.controller('houseController', ['$scope', '$state', 'myFactory', '$stateParams', function($scope, $state, myFactory, $stateParams) {
    if ($stateParams.which == 'old') {
        var info = myFactory.userinfo.info;
    } else if ($stateParams.which == 'new') {
        var info = myFactory.myplan;
    }
    console.log(info)
    for (var a = 0; a < info.length; a++) {
        for (var b = 0; b < info[a].jing.length; b++) {
            console.log(info[a].jing[b].hotel)
            for (var c = 0; c < info[a].jing[b].hotel.length; c++) {
                if ($stateParams.name == info[a].jing[b].hotel[c].name) {
                    $scope.infomation = info[a].jing[b].hotel[c]
                    console.log($scope.infomation)
                    return;
                }
            }
        }
    }
}])
