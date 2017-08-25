/*global angular*/
nutrifamiMobile.controller('nc_comoJugarController', function($scope, $location, UsuarioService) {
    'use strict';



    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();


    $scope.nutricompra = true;



});
