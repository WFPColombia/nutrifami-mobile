nf2.directive('unitHeader', [ '$rootScope', function( $rootScope) {
    return {
        scope: {
            data: '=',
            exitUnit: '&onExitUnit',
            changeAudio: '&onChangeAudio'
        },
        templateUrl: 'directives/unitHeader/unitHeader.drt.html',
        link: function($scope) {
        }
    };
}]);
