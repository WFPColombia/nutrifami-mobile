/*global angular*/
nutrifamiMobile.controller('nc_comoJugarController', function($scope, $location, UserService) {
    'use strict';



    $scope.usuarioActivo = UserService.getUser();


    $scope.nutricompra = true;



});
