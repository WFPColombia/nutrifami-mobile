nutrifamiMobile.controller('RecetasBuscarCtrl', function($ionicPlatform, $scope, $ionicLoading, $location, $ionicViewSwitcher, $ionicFilterBar, RecetasService, UsuarioService) {
    'use strict';

    $scope.recetas = {};
    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();


    $ionicPlatform.ready(function() {

        var filterBarInstance;

        $scope.abrirReceta = function(id) {
            $scope.atras = false;
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/recetas/receta/' + id);
        }


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



        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if ($location.path() == "/app/recetas/buscar") {

                init();
            }

        })


        function init() {

            $scope.mostrarFiltros = true;
            $scope.atras = true;

            console.log("Mostrar recetas")


            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            RecetasService.actualizar(function(response) {
                $scope.recetas = response['data'];


                var ingredientes = {};
                var region = {};
                var duracion = {}

                for (var item in $scope.recetas) {
                    var receta_temp = $scope.recetas[item];

                    //Conteo de ingredientes
                    for (var ingrediente in receta_temp.ingredientes) {
                        if (ingredientes[receta_temp.ingredientes[ingrediente].nombre]) {
                            ingredientes[receta_temp.ingredientes[ingrediente].nombre]++;
                        } else {
                            ingredientes[receta_temp.ingredientes[ingrediente].nombre] = 1;
                        }
                    }

                    if (region[receta_temp.region]) {
                        region[receta_temp.region]++;
                    } else {
                        region[receta_temp.region] = 1; //VOY AQUÍ
                    }


                }

                console.log(ingredientes);
                console.log(region);

                $scope.filtros = [{
                    'nombre': 'Tiempo de preparación',
                    'clase': 'icon ion-android-alarm-clock',
                    'elementos': [{
                        'label': '10 min',
                        'valor': '10'
                    }, {
                        'label': '20 min',
                        'valor': '20'
                    }, {
                        'label': '30 min',
                        'valor': '30'
                    }, {
                        'label': '40 min',
                        'valor': '40'
                    }, ]
                }, {
                    'nombre': 'Ingredientes',
                    'clase': 'icon ion-soup-can',
                    'elementos': [{
                        'label': '10 min',
                        'valor': '10'
                    }, {
                        'label': '20 min',
                        'valor': '20'
                    }, {
                        'label': '30 min',
                        'valor': '30'
                    }, {
                        'label': '40 min',
                        'valor': '40'
                    }, ]
                }];






                $ionicLoading.hide();
                $scope.showFilterBar();

            });
        }

    });
});