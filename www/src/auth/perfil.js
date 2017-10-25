nutrifamiMobile.controller('PerfilCtrl', function($ionicPlatform, $scope, $ionicViewSwitcher, $location, UserService) {
    'use strict';

    $ionicPlatform.ready(function() {
        
        $scope.user = UserService.getUser();
        
        console.log($scope.user);

    });
});