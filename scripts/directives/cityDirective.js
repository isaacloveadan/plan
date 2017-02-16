app.directive('cityclassify', function() {
    return {
        restrict: 'EA',
        templateUrl: 'widgets/cityclassify.html',
        replace: false,
        scope: false,
        controller: function($scope) {

        },
        link: function(scope, iElement, iAttrs, transclude) {

        }
    }
})
app.directive('citydetail', function() {
    return {
        restrict: 'EA',
        templateUrl: 'widgets/citydetail.html',
        replace: false,
        scope: false,
        controller: function($scope) {},
        link: function(scope, iElement, iAttrs, transclude) {

        }
    }
})
app.directive('repeatdoneimg', function() {
    return {
        restrict: 'EA',
        replace: false,
        scope: false,
        controller: function($scope,$timeout) {
            if ($scope.$last === true) {
                $timeout(function() {
                    console.log(1);
                    $scope.$emit('ngRepeatFinished');
                    console.log(2);
                });
            }
        },
        link: function(scope, iElement, iAttrs, transclude) {

        }
    }
})
