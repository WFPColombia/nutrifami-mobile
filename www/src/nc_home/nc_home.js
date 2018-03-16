/*global angular*/
nf2.controller('ncHomeCtrl', function ($ionicPlatform, NutricompraService) {
    'use strict';
    $ionicPlatform.ready(function () {
        console.log('HomeCtrl');
        NutricompraService.clearProductos(function (response) {
            console.log("Clear productos");
        });

    });
});