nf2.directive('opcionUnidadInfo', function($stateParams, CapacitationService) {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            index: '@'
        },
        templateUrl: 'views/directives/opcionUnidadInfo.drt.html',
        link: function($scope) {
            $scope.unidad = CapacitationService.getUnitFromOrder($stateParams.lesson, $stateParams.unit);
            $scope.assetpath = $scope.$parent.TARGETPATH+$stateParams.capacitation+"/"+$stateParams.module+"/"+$stateParams.lesson+"/"+$scope.unidad.id+"/";
            $scope.audiosDescargados = $scope.$parent.audiosDescargados;
            
            $scope.click = function() {
                $scope.$parent.seleccionarOpcion($scope.index);
            };
        }
    };
});
