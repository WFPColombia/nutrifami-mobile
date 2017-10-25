nutrifamiMobile.controller('EditarPerfilCtrl', function ($ionicPlatform, $scope, UserService) {
    'use strict';

    $ionicPlatform.ready(function () {

        $scope.user = UserService.getUser();

        $scope.update = function (user) {
            console.log($scope.user);
        };

    });
});