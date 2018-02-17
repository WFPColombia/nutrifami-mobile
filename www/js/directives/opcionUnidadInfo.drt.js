nf2.directive('opcionUnidadInfo', function($stateParams, CapacitacionService) {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            index: '@'
        },
        templateUrl: 'views/directives/opcionUnidadInfo.drt.html',
        link: function($scope) {
            $scope.unidad = CapacitacionService.getUnidad($stateParams.leccion, $stateParams.unidad);
            $scope.assetpath = $scope.$parent.TARGETPATH+$stateParams.capacitacion+"/"+$stateParams.modulo+"/"+$stateParams.leccion+"/"+$scope.unidad.id+"/";
            $scope.audiosDescargados = $scope.$parent.audiosDescargados;
            
            $scope.click = function() {
                $scope.$parent.seleccionarOpcion($scope.index);
            };
        }
    };
});
