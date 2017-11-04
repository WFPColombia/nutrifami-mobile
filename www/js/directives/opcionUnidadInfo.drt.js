nutrifamiMobile.directive('opcionUnidadInfo', function($rootScope) {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            index: '@'
        },
        templateUrl: 'views/directives/opcionUnidadInfo.drt.html',
        link: function($scope, $rootScope, $element, $attrs) {
            $scope.tp = $scope.$parent.TARGETPATH;
            $scope.audiosDescargados = $scope.$parent.audiosDescargados;
            
            $scope.click = function() {
                $scope.$parent.seleccionarOpcion($scope.index);
            };
        }
    };
});
