nutrifamiMobile.directive('moduloInfo', ['$location', function ($location) {
        return {
            restrict: 'E',
            scope: {
                info: '=',
                avance: '='
            },
            templateUrl: 'views/directives/moduloInfo.drt.html',
            link: function ($scope, $element, $attrs) {
                $scope.cargando = false;
                $scope.totalLecciones = function () {
                    return (Object.keys($scope.info.lecciones).length);
                };
                $scope.porcentajeAvance = function () {
                    return(100 / $scope.totalLecciones() * $scope.avance.leccionesTerminadas);
                };
                $scope.irAlModulo = function () {
                    $location.path('/m/' + $scope.info.id);
                };
            }
        };
    }]);
