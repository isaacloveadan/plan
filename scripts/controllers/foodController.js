app.controller('foodController', ['$scope', '$state', 'myFactory', '$stateParams', function($scope, $state, myFactory, $stateParams) {
    if ($stateParams.which == 'old') {
        var info = myFactory.userinfo.info;
    } else if ($stateParams.which == 'new') {
        var info = myFactory.myplan;
    }
    console.log(info)
    for (var a = 0; a < info.length; a++) {
        for (var b = 0; b < info[a].jing.length; b++) {
            console.log(info[a].jing[b].food)
            for (var c = 0; c < info[a].jing[b].food.length; c++) {
                if ($stateParams.name == info[a].jing[b].food[c].name) {
                    console.log('here');
                    $scope.infomation = info[a].jing[b].food[c]
                    console.log($scope.infomation)
                    return;
                }
            }
        }
    }
}])
