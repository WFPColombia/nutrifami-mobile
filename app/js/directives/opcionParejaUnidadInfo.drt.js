nutrifamiMobile.directive('opcionParejaUnidadInfo', function () {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            index: '@'
        },
        templateUrl: 'views/directives/opcionParejaUnidadInfo.drt.html',
        link: function ($scope, $element, $attrs) {
            $scope.click = function () {
                $scope.$parent.seleccionarPareja($scope.index);
            };
        }
    };
});