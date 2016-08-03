/*global angular*/
nutrifamiMobile.controller('HomeController', function ($scope) {
    'use strict';
    document.addEventListener("deviceready", function () {
        
        console.log("El dispositivo está listo");
        $scope.mensaje = "El dispositivo está listo";
        $scope.url = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
        $scope.trustHosts = true;
        
    }, true);

});