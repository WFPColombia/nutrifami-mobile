nf2.directive('opcionParejaUnidadInfo', function($stateParams, CapacitacionService) {
    return {
        restrict: 'E',
        scope: {
            opc1: '=',
            opc2: '=',
            index1: '=',
            index2: '='
        },
        templateUrl: 'views/directives/opcionParejaUnidadInfo.drt.html',
        link: function($scope) {
            $scope.unidad = CapacitacionService.getUnidad($stateParams.leccion, $stateParams.unidad);
            $scope.assetpath = $scope.$parent.TARGETPATH+$stateParams.capacitacion+"/"+$stateParams.modulo+"/"+$stateParams.leccion+"/"+$scope.unidad.id+"/";
            $scope.audiosDescargados = $scope.$parent.audiosDescargados;
            
            $scope.click = function(index) {
                $scope.$parent.seleccionarPareja(index);
            };

            $scope.playAudio = function(audio) {
                $scope.$parent.playAudio(audio);
            };
        }
    };
});
