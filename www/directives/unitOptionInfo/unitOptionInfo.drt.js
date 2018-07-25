nf2.directive('unitOptionInfo', ['$rootScope', '$stateParams', 'CapacitationService', function($rootScope, $stateParams, CapacitationService) {
    return {
        scope: {
            data: '=',
            assetpath: '=',
            click: '&onClick'
        },
        templateUrl: 'directives/unitOptionInfo/unitOptionInfo.drt.html',
        link: function($scope) {
            var unit = CapacitationService.getUnitFromOrder($stateParams.lesson, $stateParams.unit);
            $scope.audios = $scope.$parent.audiosDescargados;
        }
    };
}]);
