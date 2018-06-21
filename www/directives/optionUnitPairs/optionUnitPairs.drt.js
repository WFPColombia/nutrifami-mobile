nf2.directive('optionUnitPairs', ['$rootScope', '$stateParams', 'CapacitationService', function($rootScope, $stateParams, CapacitationService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            click: '&onClick'
        },
        templateUrl: 'directives/optionUnitPairs/optionUnitPairs.drt.html',
        link: function($scope) {
            var unit = CapacitationService.getUnitFromOrder($stateParams.lesson, $stateParams.unit);
            if ($rootScope.isMobile) {
                $scope.assetpath = $scope.$parent.TARGETPATH+$stateParams.capacitation+"/"+$stateParams.module+"/"+$stateParams.lesson+"/"+unit.id+"/";
            } else {
                $scope.assetpath = $rootScope.TARGETPATH;
            }

            $scope.audiosDescargados = $scope.$parent.audiosDescargados;
            
            $scope.playAudio = function(audio) {
                $scope.$parent.playAudio(audio);
            };
        }
    };
}]);
