nf2.controller('HomeBuscarCtrl', function($ionicPlatform, $scope, $ionicLoading, $location, $ionicViewSwitcher, $ionicFilterBar, CapacitationService, UsuarioService) {
    'use strict';

    $scope.recetas = {};
    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();


    $ionicPlatform.ready(function() {

        var filterBarInstance;

        $scope.abrir = function(id) {
            //$scope.atras = false;
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            console.log('capacitacion: ' + id);
            //$location.path('/app/recetas/receta/' + id);
        };


        $scope.showFilterBar = function() {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.recetas,
                cancelText: 'Cancelar',
                placeholder: 'Buscar',
                cancel: function() {

                    if ($scope.atras) {
                        $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                        $location.path('/app/recetas');
                    }
                },

                update: function(filteredItems, filterText) {
                    $scope.mostrarFiltros = false;
                    $scope.recetas = filteredItems;
                    console.log(filterText);
                    if (!filterText) {
                        $scope.mostrarFiltros = true;
                    }
                },
            });



        };

        $scope.filtrar = function(texto) {
            $scope.mostrarFiltros = false;
            var event = new Event('change');
            var input_filtro = document.getElementsByClassName("filter-bar-search")[0];
            input_filtro.value = texto;
            input_filtro.dispatchEvent(event);
        };

        

        function init() {            
            $scope.capacitaciones = CapacitationService.getCapacitacionesActivas();
            console.log($scope.capacitaciones);
        }
        init();

    });
});