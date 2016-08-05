nutrifamiMobile.directive('calificarUnidad', function () {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: 'views/directives/calificarUnidad.drt.html',
        link: function ($scope, $element, $attrs) {
            $scope.calificar = function () {
                $scope.$parent.calificarUnidad();
            };
        }
    };
});