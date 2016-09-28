nutrifamiMobile.controller('ComprasGrupoController', function($ionicPlatform, $location, $scope, $ionicLoading, $stateParams, ComprasService, UsuarioService, AudioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();



        var usuario = {};
        usuario.did = 66976632;
        $scope.groups = [];

        var puntoVenta = {
            'pid': 0
        };

        $scope.loading = $ionicLoading.show({
            //template: 'Cargando datos...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 40
        });

        ComprasService.getConsolidadoComprasUltimoMesByGroup(usuario, $stateParams.grupo, function(response) {
            $ionicLoading.hide();
            $scope.grupo = response.data;
            console.log($scope.grupo);
            puntoVenta['pid'] = response.puntoVenta;
            var totalCompra = 0;
            for (var i in $scope.grupo.compra) {
                totalCompra = totalCompra + parseInt($scope.grupo.compra[i].total);
            }

            $scope.grupo.totalCompra = totalCompra;

            $scope.carita = 'triste';
            if ($scope.grupo.porcentaje_visual >= 75 && $scope.grupo.porcentaje_visual <= 125) {
                $scope.carita = 'feliz';
            }


            $scope.audios = {
                'resumenCompras': 'audios/compras-resumen-' + $scope.grupo.grupo_id + '.mp3',
                'compraIdeal': 'audios/compra-ideal.mp3'
            };
            AudioService.preloadSimple($scope.audios);
            $scope.loading = $ionicLoading.show({
                //template: 'Cargando datos...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });
            ComprasService.getProductosPuntoVentaByGroup(puntoVenta, $stateParams.grupo, function(response) {
                $ionicLoading.hide();
                for (var i = 0; i < 1; i++) {
                    $scope.groups[i] = {
                        name: i,
                        items: []
                    };
                    for (var j in response.data.productos) {
                        $scope.groups[i].items.push(response.data.productos[j]);
                    }
                }
            });

        });






        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group, audio) {
            $scope.playAudio(audio);
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

        $scope.stopAudio = function() {
            AudioService.stopAll($scope.audios);
        }

        $scope.playAudio = function(audio) {
            AudioService.stopAll($scope.audios);
            AudioService.play(audio);
        };


    });
});
