/*global angular*/
nf2.controller('AuthProfileEditCtrl', function ($ionicPlatform, $filter, $scope, $rootScope, $state, $ionicLoading, $ionicPopup, UserService) {
    'use strict';
    $ionicPlatform.ready(function () {

        console.log($rootScope.lang)

        if ($rootScope.isOffline) {
            $scope.modal = {
                texto1: 'Sin conexión a Internet',
                texto2: 'Actualmente su equipo no tiene conexión a Internet. Para ver esta sección debe estár conectado a Internet',
                estado: 'error' // ok, alert, error
            };
            $ionicPopup.show({
                templateUrl: 'modals/simple/simple.modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: $filter('translate')('Salir'),
                        type: 'button-positive',
                        onTap: function (e) {
                            $state.go('nf.auth_profile');
                        }
                    }]
            });
        }

        $scope.user = UserService.getUser();

        $scope.generos = {
        availableOptions: [
                {id: 'Femenino', name: $filter('translate')('Femenino')},
                {id: 'Masculino', name: $filter('translate')('Masculino')}
            ],
            selectedOption: {id: $scope.user.genero, name: $scope.user.genero}
        };

        $scope.tipos_documento = {
            availableOptions: [
                {id: 'Cédula de ciudadania', name: $filter('translate')('Cédula de ciudadania / DNI')},
                {id: 'Pasaporte', name: $filter('translate')('Pasaporte')},
                {id: 'Otro', name: $filter('translate')('Otro')}
            ],
            selectedOption: {id: $scope.user.tipo_documento, name: $scope.user.tipo_documento}
        };

        $scope.tipos_usuario = {
            availableOptions: [
                {id: 'Director', name: $filter('translate')('Director')},
                {id: 'Profesor', name: $filter('translate')('Profesor')},
                {id: 'Encargado del Comedor', name: $filter('translate')('Encargado del Comedor')},
                {id: 'Cocinero', name: $filter('translate')('Cocinero')},
                {id: 'Jefe de Cocina', name: $filter('translate')('Jefe de Cocina')},
                {id: 'Comité de Gestión', name: $filter('translate')('Comité de Gestión')},
                {id: 'Estudiante', name: $filter('translate')('Estudiante')},
                {id: 'Otro', name: $filter('translate')('Otro')}
            ],
            selectedOption: {id: $scope.user.tipo_usuario, name: $scope.user.tipo_usuario}
        };

        $scope.date = {};


        if ($scope.user.fecha_nacimiento !== null) {
            var nacimiento = $scope.user.fecha_nacimiento;
            var n_ano = nacimiento.slice(0, 4);
            var n_mes = nacimiento.slice(5, 7) - 1;
            var n_dia = nacimiento.slice(8, 10);

            $scope.date.fecha_nacimiento = new Date(n_ano, n_mes, n_dia);
        } else {
            $scope.date.fecha_nacimiento = new Date(0, 0, 0);
        }

        /*PerfilService.getLocation(function(response) {
         $scope.paises = response.countries;
         
         $scope.departamentos = response.states;
         $scope.ciudades = response.cities;
         
         for (var pais in response.countries) {
         if ($scope.user.pais == response.countries[pais].name) {
         $scope.user.pais_id = {
         id: response.countries[pais].id,
         name: response.countries[pais].name,
         phonecode: response.countries[pais].phonecode,
         sortname: response.countries[pais].sortname,
         }
         
         }
         }
         
         for (var departamento in response.states) {
         if ($scope.user.departamento == response.states[departamento].name) {
         $scope.user.departamento_id = {
         id: response.states[departamento].id,
         name: response.states[departamento].name,
         country_id: response.states[departamento].country_id,
         };
         $scope.departamentos_filter = [$scope.user.departamento_id];
         
         }
         }
         
         for (var ciudad in response.cities) {
         if ($scope.user.municipio == response.cities[ciudad].name) {
         $scope.user.municipio_id = {
         id: response.cities[ciudad].id,
         name: response.cities[ciudad].name,
         state_id: response.cities[ciudad].state_id,
         };
         $scope.ciudades_filter = [$scope.user.municipio_id];
         }
         }
         });*/

        $scope.updateUser = function () {
            $scope.loading = $ionicLoading.show({
                template: $filter('translate')('Guardando Cambios'),
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            $scope.user.genero = $scope.generos.selectedOption.id || '';
            $scope.user.tipo_documento = $scope.tipos_documento.selectedOption.id || '';
            $scope.user.tipo_usuario = $scope.tipos_usuario.selectedOption.id || '';

            var tempMonth = $scope.date.fecha_nacimiento.getMonth() + 1;
            var tempDay = $scope.date.fecha_nacimiento.getDate();

            if (tempMonth < 10) {
                tempMonth = "0" + tempMonth;
            }
            $scope.user.fecha_nacimiento = $scope.date.fecha_nacimiento.getFullYear() + "-" + tempMonth + "-" + tempDay;

            console.log($scope.user)

            UserService.updateUser($scope.user);

        };

        $scope.updateDropDownDepartamentos = function (pais) {
            $scope.departamentos_filter = $filter('filter')($scope.departamentos, {country_id: pais}, true);
        };

        $scope.updateDropDownCiudades = function (estado) {
            $scope.ciudades_filter = $filter('filter')($scope.ciudades, {state_id: estado}, true);
        };

        $scope.$on('userUpdated', function (event, data) {
            $ionicLoading.hide();
            $scope.modal = {
                texto1: 'Los datos han sido guardado con éxito',
                estado: 'ok' // ok, alert, error
            };
            $ionicPopup.show({
                templateUrl: 'modals/simple/simple.modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: $filter('translate')('Continuar'),
                        type: 'button-positive',
                        onTap: function (e) {
                            $state.go('nf.auth_profile');
                        }
                    }]
            });
        });

        $scope.$on('userFaliedUpdate', function (event, data) {
            $ionicLoading.hide();
            var error = data[Object.keys(data)[0]];
            $scope.modal = {
                texto1: 'Ops!! Hubo un error y los datos no fueron guardado',
                texto2: error[0],
                estado: 'error' // ok, alert, error
            };
            $ionicPopup.show({
                templateUrl: 'modals/simple/simple.modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: $filter('translate')('Continuar'),
                        type: 'button-positive',
                        onTap: function (e) {
                        }
                    }]
            });
        });

    }, false);
});
