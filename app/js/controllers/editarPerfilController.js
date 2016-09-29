/*global angular*/
nutrifamiMobile.controller('EditarPerfilController', function ($ionicPlatform, $scope, $location, $ionicLoading, UsuarioService) {
    'use strict';
    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     END CORDOVA FILES */

    var usuarioActivo = UsuarioService.getUsuarioActivo();
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
        console.log("Guardar cambios")
        $scope.dataLoading = true;
        usuarioActivo = $scope.usuarioActivo;
        usuarioActivo.genero = $scope.usuarioActivo.generos.selectedOption.id;
        usuarioActivo.etnia = $scope.usuarioActivo.etnias.selectedOption.id;
        var tempMonth = $scope.usuarioActivo.birthdate.getMonth() + 1;
        if (tempMonth < 10) {
            tempMonth = "0" + tempMonth;
        }
        $scope.usuarioActivo.birthdate = $scope.usuarioActivo.birthdate.getFullYear() + "-" + tempMonth + "-" + $scope.usuarioActivo.birthdate.getDate();
        console.log(usuarioActivo)

        // Oberlay Cargando mientras se guarda el avance
            $scope.loading = $ionicLoading.show({
                template: 'Guardando Cambios...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });
        UsuarioService.setUsuarioActivo(usuarioActivo, function (response) {
            if (response.success) {
                $ionicLoading.hide();
                //$location.path('/app/perfil');
            }
            $scope.dataLoading = false;
        });

    };
    /* BEGIN CORDOVA FILES
     }, false);
     END CORDOVA FILES */
});