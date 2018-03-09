nf2.directive('lessonDrt', function (UserService, $ionicViewSwitcher, $state, $stateParams) {
    return {
        restrict: 'E',
        scope: {
            leccion: '=',
        },
        templateUrl: 'directives/lesson/lesson.drt.html',
        link: function ($scope) {
            $scope.audiosDescargados = $scope.$parent.audiosDescargados;
            $scope.avance = UserService.getAvanceLeccion($scope.leccion.id);
            $scope.click = function () {
                $ionicViewSwitcher.nextDirection('forward');
                $state.go('cap_unit', {
                    capacitation: $stateParams.capacitation,
                    module: $stateParams.module,
                    lesson: $scope.leccion.id,
                    unit: 1
                });
            };
        }
    };
});