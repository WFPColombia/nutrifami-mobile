nutrifamiMobile.directive('opcionParejaUnidadInfo', function($rootScope) {
    return {
        restrict: 'E',
        scope: {
            opc1: '=',
            opc2: '=',
            index1: '=',
            index2: '='
        },
        templateUrl: 'views/directives/opcionParejaUnidadInfo.drt.html',
        link: function($scope, $rootScope, $element, $attrs) {
            $scope.tp = $scope.$parent.TARGETPATH;

            $scope.click = function(index) {
                $scope.$parent.seleccionarPareja(index);
            };

            $scope.playAudio = function(audio) {
                $scope.$parent.playAudio(audio);
            }
        }
    };
});
