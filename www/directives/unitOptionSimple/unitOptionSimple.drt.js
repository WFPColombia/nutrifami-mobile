nf2.directive('unitOptionSimple', ['$rootScope', '$stateParams', 'CapacitationService', function($rootScope, $stateParams, CapacitationService) {
    return {
        scope: {
            data: '=',
            assetpath: '=',
            click: '&onClick',
            playAudio: '&onPlayAudio'
        },
        templateUrl: 'directives/unitOptionSimple/unitOptionSimple.drt.html',
        link: function($scope) {
            var unit = CapacitationService.getUnitFromOrder($stateParams.lesson, $stateParams.unit);
            $scope.audios = $scope.$parent.audiosDescargados;
        }
    };
}]);
