/*global angular*/
nf2.controller('LanguageCtrl', function ($ionicPlatform, $scope, $rootScope, $translate, $ionicHistory, $location, $ionicSideMenuDelegate, UserService) {
    'use strict';

    $ionicPlatform.ready(function () {
        
        console.log("language");

        $scope.lang = {
            current: $rootScope.lang
        };

        $scope.languages = [
            {
                id: 'es',
                name: 'Español'
            },
            {
                id: 'en',
                name: 'Ingles'
            },
            {
                id: 'fr',
                name: 'Francés'
            }
        ];

        $scope.changeLanguage = function () {
            
            console.log('changeLanguage ' + $scope.lang.current);
            $translate.use($scope.lang.current);
            $rootScope.lang = $scope.lang.current
            UserService.updateUserLanguage($scope.lang.current);
            // var backView = $ionicHistory.backView()
            // $location.path(backView.stateName);

            $ionicSideMenuDelegate.toggleLeft();
        };

        


    });
});