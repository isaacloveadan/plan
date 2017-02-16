app.directive('repeatdone', function() {
    return {
        restrict: 'EA',
        replace: false,
        scope: false,
        controller: function($scope, myFactory,$timeout) {
          if ($scope.$last === true) {
              $timeout(function() {
                  console.log(1);
                  $scope.$emit('ngRepeatFinished2');
                  console.log(2);
              });
          }
        },
        link: function(scope, iElement, iAttrs, transclude) {

        }
    }
})
app.directive('detailitems', function() {
    return {
        restrict: 'EA',
        templateUrl: 'widgets/detailitems.html',
        replace: false,
        scope: false,
        controller: function($scope, myFactory, $stateParams) {
            // 详情列表页数据
            if ($stateParams.which == 'old') {
                $scope.details = myFactory.userinfo.info;
            } else if ($stateParams.which == 'new') {
                $scope.details = myFactory.myplan;
            }
            var detailtitle = angular.element('.days span.bigspan')
            myFactory.toptitle = detailtitle.eq(0).html()
            $scope.toptitle = myFactory.toptitle;
            // 花费时间显示与否
            $scope.taketime = function(deta, det) {
                if (deta.length == 1) {
                    return false;
                } else {
                    if (det == (deta.length - 1)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        },
        link: function(scope, iElement, iAttrs, transclude) {

        }
    }
})
