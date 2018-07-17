nf2.directive('optionUnitSimple', ['$rootScope', '$stateParams', 'CapacitationService', function($rootScope, $stateParams, CapacitationService) {
    return {
        scope: {
            data: '=',
            click: '&onClick',
            playAudio: '&onPlayAudio'
        },
        templateUrl: 'directives/optionUnitSimple/optionUnitSimple.drt.html',
        link: function($scope) {
            var unit = CapacitationService.getUnitFromOrder($stateParams.lesson, $stateParams.unit);
            if ($rootScope.isMobile) {
                $scope.assetpath = $scope.$parent.TARGETPATH_IMAGES+$stateParams.capacitation+"/"+$stateParams.module+"/"+$stateParams.lesson+"/"+unit.id+"/";
            } else {
                $scope.assetpath = $rootScope.TARGETPATH;
            }
            $scope.audios = $scope.$parent.audiosDescargados;
        }
    };
}]);
