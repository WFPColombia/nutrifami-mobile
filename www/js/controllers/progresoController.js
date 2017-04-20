nutrifamiMobile.controller('ProgresoController', function($ionicPlatform, $ionicPopup, $scope, $ionicLoading, UsuarioService) {
    'use strict';
    $ionicPlatform.ready(function() {

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
        $scope.usuarioAvance = UsuarioService.getUsuarioAvance();
        $scope.usuarioFamilia = UsuarioService.getUsuarioFamilia();

        console.log($scope.usuarioActivo);
        console.log($scope.usuarioAvance);
        console.log($scope.usuarioFamilia);


        $scope.cargarMiProgreso = function() {
            $scope.loading = $ionicLoading.show({
                //template: 'Cargando datos...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });


            $ionicLoading.hide();
        };

        $scope.cargarMiFamiliaProgreso = function() {
            $scope.loading = $ionicLoading.show({
                //template: 'Cargando datos...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });


            $ionicLoading.hide();

        };

        $scope.verDiploma = function(index) {

            $scope.diplomaTitulo = $scope.usuarioAvance.diplomas[index];

            var popUpDiploma = $ionicPopup.show({
                templateUrl: 'views/modals/diploma.modal.html',
                scope: $scope,
                cssClass: 'diploma',
                buttons: [
                    /*{
                                            text: 'Descargar',
                                            type: 'button-positive',
                                            onTap: function(e) {
                                                $scope.descargar();
                                            }
                                        }
                                        , */
                    {
                        text: 'Continuar',
                        type: 'button-positive',
                        onTap: function(e) {
                            //MediaService.unload($scope.audios);

                        }
                    }
                ]
            });


        };

        $scope.descargar = function() {
            console.log("Imprimir");
            html2canvas(document.getElementById('prueba'), {

                onrendered: function(canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 798
                        }],
                        pageSize: {
                            width: 800,
                            height: 500
                        },
                        pageMargins: [1, 1, 1, 1]

                    };
                    pdfMake.createPdf(docDefinition).download("Diploma - " + $scope.diplomaTitulo + ".pdf");
                }
            });
        }


    });
});
