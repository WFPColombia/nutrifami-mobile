nf2.directive('unitQuestion', [ '$rootScope', function( $rootScope) {
    return {
        scope: {
            data: '=',
            assetpath: '=',
            exitUnit: '&onExitUnit',
        },
        templateUrl: 'directives/unitQuestion/unitQuestion.drt.html',
        link: function($scope) {
            console.log($scope.$parent.ICON_AUDIO)
            $scope.ICON_AUDIO = $scope.$parent.ICON_AUDIO;
            
        }
    };
}]);
