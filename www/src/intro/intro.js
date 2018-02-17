/*global angular*/
nf2.controller('IntroCtrl', function($ionicPlatform, $scope, $location, MediaService, UserService) {
    'use strict';

    $ionicPlatform.ready(function() {

        $scope.audios = {
            audio1: MediaService.getMediaURL('audios/intro-1.wav'),
            audio2: MediaService.getMediaURL('audios/intro-2.wav'),
            audio3: MediaService.getMediaURL('audios/intro-3.wav'),
            audio4: MediaService.getMediaURL('audios/intro-4.wav')
        };
        
        $scope.usuarioActivo = UserService.getUser();
        
        $scope.playAudio = function(audio) {
            MediaService.play(audio);
        };

        $scope.comenzar = function() {
            $location.path('/');
        };
        
        $scope.$on('$ionicView.enter', function () {
            MediaService.preloadSimple($scope.audios);
        });
        
        $scope.$on('$ionicView.beforeLeave', function () {
            MediaService.unload();
        });

    });
});
