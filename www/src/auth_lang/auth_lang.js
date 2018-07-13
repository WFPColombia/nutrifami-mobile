/*global angular*/
nf2.controller('AuthLangCtrl', function ($ionicPlatform, $scope, $rootScope, $translate, $location) {
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
            $location.path('/auth');
        };

        


    });
});