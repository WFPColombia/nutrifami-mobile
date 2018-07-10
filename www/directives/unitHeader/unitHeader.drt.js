nf2.directive('unitHeader', [ '$rootScope', function( $rootScope) {
    return {
        scope: {
            data: '=',
            exitUnit: '&onExitUnit',
        },
        templateUrl: 'directives/unitHeader/unitHeader.drt.html',
        link: function($scope) {
            console.log($scope.$parent.ICON_AUDIO)
            $scope.ICON_AUDIO = $scope.$parent.ICON_AUDIO;
        }
    };
}]);
