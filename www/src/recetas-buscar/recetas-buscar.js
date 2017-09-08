nutrifamiMobile.controller('RecetasBuscarCtrl', function($ionicPlatform, $scope, $ionicLoading, $location, $ionicViewSwitcher, $ionicFilterBar, RecetasService, UsuarioService) {
    'use strict';

    $scope.recetas = {};
    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();

    $ionicPlatform.ready(function() {

        var filterBarInstance;

        $scope.abrirReceta = function(id) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/recetas/receta/' + id);
        }


        $scope.showFilterBar = function() {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.recetas,
                cancelText: 'Cancelar',
                placeholder: 'Buscar',
                cancel: function() {
                    $ionicViewSwitcher.nextDirection('back'); // 'forward', 'back', etc.
                    $location.path('/app/recetas');
                },

                update: function(filteredItems, filterText) {
                    $scope.recetas = filteredItems;
                    console.log(filterText);



                }
            });


        };

        $scope.prueba = function() {
            var event = new Event('change');
            var x = document.getElementsByClassName("filter-bar-search")[0];
            x.value += "ensalada ";

            // Create a new 'change' event


            // Dispatch it.
            x.dispatchEvent(event);


            console.log(x);

            //filter-bar-search ng-pristine ng-valid ng-empty ng-touched
        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

            console.log("State changed: ", toState);

            if ($location.path() == "/app/recetas/buscar") {

                init();
            }

        })


        function init() {

            console.log("Mostrar recetas")


            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            RecetasService.actualizar(function(response) {
                console.log(response['data']);
                $scope.recetas = response['data'];
                $ionicLoading.hide();
                $scope.showFilterBar();

            });
        }

    });
});