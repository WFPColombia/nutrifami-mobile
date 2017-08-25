/*global angular*/
nutrifamiMobile.controller('EditarPerfilController', function($ionicPlatform, $filter, $scope, $rootScope, $location, $ionicLoading, $ionicPopup, UsuarioService, PerfilService) {
    'use strict';
    $ionicPlatform.ready(function() {

        if ($rootScope.isOffline) {
            $ionicPopup.alert({
                    title: "Sin conexión a Internet",
                    content: "Actualmente su equipo no tiene conexión a Internet. Para ver esta sección debe estár conectado a Internet ",
                    buttons: [
                        { text: 'Salir' }
                    ]
                })
                .then(function(res) {
                    $location.path('/app/capacitacion');
                });
        }

        $scope.usuarioActivo = UsuarioService.getUsuarioActivo();
        $scope.usuarioActivo.generos = {
            availableOptions: [
                { id: 'F', name: 'Femenino' },
                { id: 'M', name: 'Masculino' }
            ],
            selectedOption: { id: $scope.usuarioActivo.genero, name: $scope.usuarioActivo.genero }
        };
        $scope.usuarioActivo.etnias = {
            availableOptions: [
                { id: 'AFROCOLOMBIANOS', name: 'Afrocolombianos' },
                { id: 'INDIGENA', name: 'Indigenas' },
                { id: 'MESTIZO', name: 'Mestizo' },
                { id: 'OTROS', name: 'Otros' },
                { id: 'NINGUNO', name: 'Ninguno' }
            ],
            selectedOption: { id: $scope.usuarioActivo.etnia, name: $scope.usuarioActivo.etnia }
        };



        if ($scope.usuarioActivo.birthdate !== null) {
            var nacimiento = $scope.usuarioActivo.birthdate;
            var n_ano = nacimiento.slice(0, 4);
            var n_mes = nacimiento.slice(5, 7) - 1;
            var n_dia = nacimiento.slice(8, 10);

            $scope.usuarioActivo.nacimiento = new Date(n_ano, n_mes, n_dia);
        } else {
            $scope.usuarioActivo.nacimiento = new Date(0, 0, 0);
        }

        PerfilService.getLocation(function(response) {
            $scope.paises = response.countries;

            $scope.departamentos = response.states;
            $scope.ciudades = response.cities;

            for (var pais in response.countries) {
                if ($scope.usuarioActivo.pais == response.countries[pais].name) {
                    $scope.usuarioActivo.pais_id = {
                        id: response.countries[pais].id,
                        name: response.countries[pais].name,
                        phonecode: response.countries[pais].phonecode,
                        sortname: response.countries[pais].sortname,
                    }

                }
            }

            for (var departamento in response.states) {
                if ($scope.usuarioActivo.departamento == response.states[departamento].name) {
                    console.log(response.states[departamento])
                    $scope.usuarioActivo.departamento_id = {
                        id: response.states[departamento].id,
                        name: response.states[departamento].name,
                        country_id: response.states[departamento].country_id,
                    };
                    $scope.departamentos_filter = [$scope.usuarioActivo.departamento_id];

                }
            }

            for (var ciudad in response.cities) {
                if ($scope.usuarioActivo.municipio == response.cities[ciudad].name) {
                    console.log(response.cities[ciudad]);
                    $scope.usuarioActivo.municipio_id = {
                        id: response.cities[ciudad].id,
                        name: response.cities[ciudad].name,
                        state_id: response.cities[ciudad].state_id,
                    };
                    $scope.ciudades_filter = [$scope.usuarioActivo.municipio_id];
                }
            }
        });

        $scope.update = function() {


            $scope.dataLoading = true;

            var usuarioActivo = Object.assign({}, $scope.usuarioActivo);

            usuarioActivo.genero = $scope.usuarioActivo.generos.selectedOption.id || '';
            usuarioActivo.etnia = $scope.usuarioActivo.etnias.selectedOption.id || '';
            var tempMonth = usuarioActivo.nacimiento.getMonth() + 1;
            var tempDay = usuarioActivo.nacimiento.getDate();

            if (tempMonth < 10) {
                tempMonth = "0" + tempMonth;
            }

            for (var pais in $scope.paises) {
                if ($scope.paises[pais].id == usuarioActivo.pais_id) {
                    usuarioActivo.pais = $scope.paises[pais].name;

                }
            }

            for (var departamento in $scope.departamentos) {
                if ($scope.departamentos[departamento].id == usuarioActivo.departamento_id) {
                    usuarioActivo.departamento = $scope.departamentos[departamento].name;

                }
            }

            for (var ciudad in $scope.ciudades) {
                if ($scope.ciudades[ciudad].id == usuarioActivo.municipio_id) {
                    usuarioActivo.municipio = $scope.ciudades[ciudad].name;

                }
            }


            usuarioActivo.birthdate = usuarioActivo.nacimiento.getFullYear() + "-" + tempMonth + "-" + tempDay;

            delete usuarioActivo["generos"];
            delete usuarioActivo["etnias"];
            delete usuarioActivo["nacimiento"];
            delete usuarioActivo["pais_id"];
            delete usuarioActivo["departamento_id"];
            delete usuarioActivo["municipio_id"];

            // Oberlay Cargando mientras se guarda el avance
            $scope.loading = $ionicLoading.show({
                template: 'Guardando Cambios...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 40
            });

            console.log(usuarioActivo);

            UsuarioService.setUsuarioActivo(usuarioActivo, function(response) {
                if (response.success) {
                    $scope.mensaje = {
                        texto: "Los datos han sido guardado con éxito",
                    };
                    UsuarioService.setUsuarioActivo(usuarioActivo, function(response) {});
                } else {

                    $scope.mensaje = {
                        texto: "Ops!! Hubo un error y los datos no fueron guardados. Por favor intenta más tarde."

                    };
                }

                $ionicLoading.hide();
                $scope.dataLoading = false;

                var alertPopup = $ionicPopup.alert({
                    template: $scope.mensaje.texto
                });

            });

        };

        $scope.updateDropDownDepartamentos = function(pais) {
            console.log(pais)
            $scope.departamentos_filter = $filter('filter')($scope.departamentos, { country_id: pais },true);
        }

        $scope.updateDropDownCiudades = function(estado) {
            console.log(estado);
            $scope.ciudades_filter = $filter('filter')($scope.ciudades, { state_id: estado },true);
            console.log($scope.ciudades_filter);
        }

    }, false);
});
