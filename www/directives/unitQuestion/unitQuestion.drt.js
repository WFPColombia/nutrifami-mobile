nf2.directive('unitQuestion', [ '$rootScope', function( $rootScope) {
    return {
        scope: {
            data: '=',
            assetpath: '=',
            playAudioTitle: '&onPlayAudioTitle',
            playAudioType: '&onPlayAudioType'
        },
        templateUrl: 'directives/unitQuestion/unitQuestion.drt.html',
        link: function($scope) {
        }
    };
}]);
