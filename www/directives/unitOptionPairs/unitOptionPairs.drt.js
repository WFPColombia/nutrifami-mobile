nf2.directive('unitOptionPairs', ['$rootScope', '$stateParams', 'CapacitationService', function($rootScope, $stateParams, CapacitationService) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            assetpath: '=',
            column: '=',
            columnAImage: '=',
            click: '&onClick',
            playAudio: '&onPlayAudio'
        },
        templateUrl: 'directives/unitOptionPairs/unitOptionPairs.drt.html',
        link: function($scope) {
            var unit = CapacitationService.getUnitFromOrder($stateParams.lesson, $stateParams.unit);
            $scope.audiosDescargados = $scope.$parent.audiosDescargados;
        }
    };
}]);
