nutrifamiMobile.directive('leccionDrt', function (UserService) {
    return {
        restrict: 'E',
        scope: {
            leccion: '=',
            modulo: '=',
            index: '@'
        },
        templateUrl: 'directives/leccion/leccion.drt.html',
        link: function ($scope) {
            $scope.audiosDescargados = $scope.$parent.audiosDescargados;
            $scope.avance = UserService.getAvanceLeccion($scope.leccion.id);
            $scope.porcentajeAvance = function () {
                return(100 / $scope.totalLecciones() * $scope.avance.leccionesTerminadas);
            };
            $scope.click = function () {
                $scope.$parent.irALeccion($scope.index);
            };
        }
    };
});