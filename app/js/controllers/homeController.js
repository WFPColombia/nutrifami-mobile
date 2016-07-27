/*global angular*/
angular.module('Asiscon')
    .controller('HomeController', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        'use strict';

        $scope.mensaje = "Mensaje de prueba";
    }]);