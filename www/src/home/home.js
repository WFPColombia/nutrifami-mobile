/*global angular*/
nutrifamiMobile.controller('HomeCtrl', function($ionicPlatform, $scope, $ionicViewSwitcher, $location, CapacitacionService) {
    'use strict';

    $ionicPlatform.ready(function() {

        

        CapacitacionService.initClient();
        $scope.capacitaciones = CapacitacionService.getCapacitacionesActivas();

        $scope.abrirCapacitacion = function(capacitacion) {
            //$location.path('/' + enlace);
            $location.path('/app/' + capacitacion);
        };
        
        $scope.irABuscar = function() {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/buscar');
        };
        
        




        /*$scope.mids = CapacitacionService.getModulosId(3)
        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
        $scope.usuarioAvance = UsuarioService.getUsuarioAvance();

        $scope.modulos = [];
        //Obtenemos los ids de los modulos de la capacitación 3

        //Creamos un arreglo para poder recorerlo y mostrarlo a traves de directivas 
        for (var mid in $scope.mids) {
            var tempModulo = CapacitacionService.getModulo($scope.mids[mid]);
            tempModulo.avance = {};
            tempModulo.avance.finalizado = false;
            tempModulo.disponible = true;
            if (tempModulo.activo == '1') {
                tempModulo.activo = true;
            } else {
                tempModulo.activo = false;
            }

            if (typeof $scope.usuarioAvance['3'] !== 'undefined' && typeof $scope.usuarioAvance['3'][$scope.mids[mid]] !== 'undefined') {
                tempModulo.avance.leccionesFinalizadas = Object.keys($scope.usuarioAvance['3'][$scope.mids[mid]]).length;
                if (CapacitacionService.getLeccionesActivas(tempModulo.id).length == tempModulo.avance.leccionesFinalizadas) {
                    tempModulo.avance.finalizado = true;
                }
            } else {
                tempModulo.avance.leccionesFinalizadas = 0;
            }
            $scope.modulos.push(tempModulo);

        }

        $scope.modulos[0].disponible = true;
        for (var i in $scope.modulos) {
            if (i != 0) {
                var temp = i - 1;
                if ($scope.modulos[i].avance.finalizado) {
                    $scope.modulos[i].disponible = true;
                } else if ($scope.modulos[i].avance.leccionesFinalizadas > 0) {
                    $scope.modulos[i].disponible = true;
                } else if ($scope.modulos[temp].avance.finalizado) {
                    $scope.modulos[i].disponible = true;
                }
            }

        }*/






    });

});