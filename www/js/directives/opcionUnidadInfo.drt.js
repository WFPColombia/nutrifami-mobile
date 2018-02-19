nf2.directive('opcionUnidadInfo', function($stateParams, CapacitationService) {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            index: '@'
        },
        templateUrl: 'views/directives/opcionUnidadInfo.drt.html',
        link: function($scope) {
            $scope.unidad = CapacitationService.getUnit($stateParams.leccion, $stateParams.unidad);
            $scope.assetpath = $scope.$parent.TARGETPATH+$stateParams.capacitation+"/"+$stateParams.module+"/"+$stateParams.leccion+"/"+$scope.unidad.id+"/";
            $scope.audiosDescargados = $scope.$parent.audiosDescargados;
            
            $scope.click = function() {
                $scope.$parent.seleccionarOpcion($scope.index);
            };
        }
    };
});
