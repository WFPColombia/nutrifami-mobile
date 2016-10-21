nutrifamiMobile.directive('moduloInfo', function($location, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            info: '=',
            avance: '='
        },
        templateUrl: 'views/directives/moduloInfo.drt.html',
        link: function($scope, $element, $attrs) {
            $scope.TARGETPATH = $rootScope.TARGETPATH;

            $scope.cargando = false;
            $scope.totalLecciones = function() {
                var totalLecciones = 0;
                for (var lid in $scope.info.lecciones) {
                    var tempLeccion = nutrifami.training.getLeccion($scope.info.lecciones[lid]);
                    if (tempLeccion.activo == 1) {
                        totalLecciones++;
                    }
                }
                return (totalLecciones);
            };
            $scope.porcentajeAvance = function() {
                return (100 / $scope.totalLecciones() * $scope.info.avance.leccionesFinalizadas);
            };
            $scope.irAlModulo = function() {
                $location.path('/app/capacitacion/' + $scope.info.id);
            };
        }
    };
});
