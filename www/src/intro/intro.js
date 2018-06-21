/*global angular*/
nf2.controller('IntroCtrl', ['$ionicPlatform', '$scope', '$rootScope', '$location', 'MediaService', 'UserService', function($ionicPlatform, $scope, $rootScope, $location, MediaService, UserService) {
    'use strict';

    $ionicPlatform.ready(function() {

        var lang = $rootScope.lang

        $scope.audios = {
            audio1: MediaService.getMediaURL('audios/' + lang + '/intro-1.wav'),
            audio2: MediaService.getMediaURL('audios/' + lang + '/intro-2.wav'),
            audio3: MediaService.getMediaURL('audios/' + lang + '/intro-3.wav'),
            audio4: MediaService.getMediaURL('audios/' + lang + '/intro-4.wav')
        };

        
        
        $scope.usuarioActivo = UserService.getUser();
        
        $scope.playAudio = function(audio) {
            MediaService.play(audio);
        };

        $scope.comenzar = function() {
            $location.path('/');
        };
        
        $scope.$on('$ionicView.enter', function () {
            console.log('ionicView.enter')
            MediaService.preloadSimple($scope.audios);
        });
        
        $scope.$on('$ionicView.beforeLeave', function () {
            MediaService.unload();
        });

    });
}]);
