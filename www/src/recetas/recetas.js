nutrifamiMobile.controller('RecetasCtrl', function($ionicPlatform, $scope, $ionicLoading, $location, $ionicViewSwitcher, $ionicFilterBar, RecetasService, UsuarioService) {
    'use strict';

    $scope.recetas = {};
    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
    var filterBarInstance;

    $scope.search = { text: '' };



    $ionicPlatform.ready(function() {



        $scope.abrirReceta = function(id) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/recetas/receta/' + id);
        }

        $scope.refreshRecetas = function() {
            $scope.$broadcast('scroll.refreshComplete');
            init();
        };

        $scope.compartirReceta = function(receta_id, receta_nombre) {
            //RecetasService.sumarCompartir(receta_id, usuario_id);



            var options = {
                message: receta_nombre, // not supported on some apps (Facebook, Instagram)
                subject: 'Mira esta receta saludable de Nutrifami', // fi. for email
                files: ['', ''], // an array of filenames either locally or remotely
                url: 'https://www.nutrifami.org/',
                chooserTitle: 'Eliga una aplicación para compartir' // Android only, you can override the default share sheet title
            }
            window.plugins.socialsharing.shareWithOptions(options, function(result) {
                RecetasService.sumarCompartir(receta_id, $scope.usuarioActivo.id);

                for (var receta in $scope.recetas) {
                    if ($scope.recetas[receta].id == receta_id) {
                        $scope.recetas[receta].compartidos++;
                    }
                }
                console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)

            }, function(msg) {
                console.log("Sharing failed with message: " + msg);
            });

        };

        $scope.meGusta = function(receta_id) {
            for (var receta in $scope.recetas) {
                if ($scope.recetas[receta].id == receta_id) {
                    //$scope.recetas[receta].compartidos++;
                    if ($scope.recetas[receta].me_gusta) {
                        $scope.recetas[receta].me_gustas--;
                        $scope.recetas[receta].me_gusta = false;
                        RecetasService.restarMeGusta(receta_id, $scope.usuarioActivo.id);
                    } else {
                        $scope.recetas[receta].me_gustas++;
                        $scope.recetas[receta].me_gusta = true;
                        RecetasService.sumarMeGusta(receta_id, $scope.usuarioActivo.id);
                    }

                }
            }
        }

        $scope.showFilterBar = function() {
            filterBarInstance = $ionicFilterBar.show({
                items: $scope.recetas,
                cancelText: 'Cancelar',
                update: function(filteredItems, filterText) {
                    $scope.recetas = filteredItems;
                    if (filterText) {
                        console.log(filterText);
                    }
                }
            });
        };

        $scope.irABuscar = function() {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $location.path('/app/recetas/buscar');
        }

        function init() {

            $scope.loading = $ionicLoading.show({
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            RecetasService.actualizar(function(response) {
                console.log(response['data']);
                $scope.recetas = response['data'];
                $ionicLoading.hide();
            });
        }

        init();



    });
});