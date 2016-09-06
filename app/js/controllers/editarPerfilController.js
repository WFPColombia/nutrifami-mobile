/*global angular*/
nutrifamiMobile.controller('EditarPerfilController', ['$scope', '$location', 'PerfilService', '$rootScope', '$anchorScroll', 'bsLoadingOverlayService', '$timeout', function ($scope, $location, PerfilService, $rootScope, $anchorScroll, bsLoadingOverlayService, $timeout) {
        'use strict';
        /* BEGIN CORDOVA FILES
         document.addEventListener('deviceready', function () {
         AndroidFullScreen.immersiveMode();
         END CORDOVA FILES */
        $anchorScroll();


        /* Overloading*/
        bsLoadingOverlayService.start();
        /* Se apaga cuando el todo el contenido de la vista ha sido cargado*/
        $scope.$on('$viewContentLoaded', function () {
            /* Se le agrega 0,3 segundos para poder verlo ver inicialmente
             * cuando el contenido se demore mucho en cargar se puede quitar el timeout*/
            bsLoadingOverlayService.stop();
        });

        var usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
        $scope.usuarioActivo = usuarioActivo;
        $scope.usuarioActivo.generos = {
            availableOptions: [
                {id: 'F', name: 'Femenino'},
                {id: 'M', name: 'Masculino'}
            ],
            selectedOption: {id: usuarioActivo.genero, name: $scope.usuarioActivo.genero}
        };
        $scope.usuarioActivo.etnias = {
            availableOptions: [
                {id: 'AFROCOLOMBIANOS', name: 'Afrocolombianos'},
                {id: 'INDIGENA', name: 'Indigenas'},
                {id: 'MESTIZO', name: 'Mestizo'},
                {id: 'OTROS', name: 'Otros'},
                {id: 'NINGUNO', name: 'Ninguno'}
            ],
            selectedOption: {id: usuarioActivo.etnia, name: usuarioActivo.etnia}
        };
        $scope.usuarioActivo.birthdate = new Date($scope.usuarioActivo.birthdate);
        $scope.update = function () {
            $scope.dataLoading = true;
            usuarioActivo = $scope.usuarioActivo;
            usuarioActivo.genero = $scope.usuarioActivo.generos.selectedOption.id;
            usuarioActivo.etnia = $scope.usuarioActivo.etnias.selectedOption.id;
            var tempMonth = $scope.usuarioActivo.birthdate.getMonth() + 1;
            if (tempMonth < 10) {
                tempMonth = "0" + tempMonth;
            }
            $scope.usuarioActivo.birthdate = $scope.usuarioActivo.birthdate.getFullYear() + "-" + tempMonth + "-" + $scope.usuarioActivo.birthdate.getDate();
            delete usuarioActivo["generos"];
            delete usuarioActivo["etnias"];
            console.log(usuarioActivo);
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
            PerfilService.editarUsuario(usuarioActivo, function (response) {
                console.log("Entra a perfil service");
                console.log(response);
                if (response.success) {
                    $rootScope.mensaje = {
                        estado: true,
                        texto: "Los datos han sido guardado con éxito",
                        tiempo: 2500
                    };
                    $location.path('/perfil');
                }
                $scope.dataLoading = false;
            });

        };
        /* BEGIN CORDOVA FILES
         }, false);
         END CORDOVA FILES */
    }]);