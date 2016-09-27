nutrifamiMobile.controller('ComprasGrupoController', function($ionicPlatform, $scope, $ionicLoading, $stateParams, ComprasService, UsuarioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo()

        var usuario = {};
        usuario.did = 66976632;

        $scope.loading = $ionicLoading.show({
            //template: 'Cargando datos...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 40
        });

        ComprasService.getConsolidadoComprasUltimoMesByGroup(usuario, $stateParams.grupo, function(response) {
            $scope.grupo = response.data;
            var totalCompra = 0;
            for (var i in $scope.grupo.compra) {
                totalCompra = totalCompra + parseInt($scope.grupo.compra[i].total);
            }

            $scope.grupo.totalCompra = totalCompra;
            $ionicLoading.hide();
        });


        $scope.groups = [];
        for (var i = 0; i < 1; i++) {
            $scope.groups[i] = {
                name: i,
                items: []
            };
            for (var j = 0; j < 3; j++) {
                $scope.groups[i].items.push(i + '-' + j);
            }
        }


        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };


    });
});
