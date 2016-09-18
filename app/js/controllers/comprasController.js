nutrifamiMobile.controller('ComprasController', function ($ionicPlatform, $scope, $ionicLoading, ComprasService, UsuarioService) {
    'use strict';
    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     END CORDOVA FILES */

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo()
    console.log($scope.usuarioActivo);
    /*$scope.audio = ngAudio.load("audios/compras-intro.mp3");
     $scope.dietaVariada = ngAudio.load("audios/compras-dieta-variada.mp3");*/

    var usuario = {};
    var puntoVenta = {
        'pid':0
    };
    //usuario.did = $scope.usuarioActivo.login_documento;
    usuario.did = 66976632;

    $scope.cargarCompras = function () {
        $scope.loading = $ionicLoading.show({
            //template: 'Cargando datos...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 40
        });

        ComprasService.getConsolidadoCompras(usuario, function (response) {
            
            $scope.consumo = response.data;
            puntoVenta ['pid'] =  $scope.consumo.punto_venta_id;
            $scope.noHayDatos = false;
            
            

            if (response.success) {
                if (Object.keys($scope.consumo).length > 0) {
                    $scope.consumoUltimoMes = ordenarGrupos(getLast(getLast($scope.consumo.redencion)));
                    for (var i in $scope.consumoUltimoMes.grupo) {
                        $scope.consumoUltimoMes.grupo[i].porcentaje_visual = calcularPorcentaje($scope.consumoUltimoMes.grupo[i].porcentaje_compra, $scope.consumoUltimoMes.grupo[i].porcentaje_recomendado);
                    }
                    
                } else {
                    $scope.noHayDatos = true;
                }
            } else {
            }
            
            $scope.consumoOrganizado = [];
            for (var i = 1 ; i<=9; i++){
                for (var j in $scope.consumoUltimoMes.grupo){
                    if ($scope.consumoUltimoMes.grupo[j].grupo_id == i){
                        $scope.consumoOrganizado.push($scope.consumoUltimoMes.grupo[j]);
                    }
                }
            }
            console.log($scope.consumoOrganizado);
            
            $ionicLoading.hide();
        });
    };

    $scope.cargarRecomendados = function () {
        console.log(puntoVenta);
        $scope.loading = $ionicLoading.show({
            //template: 'Cargando datos...',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 40
        });
        
        ComprasService.getProductosPuntoVenta(puntoVenta, function (response){
            $ionicLoading.hide();
            if(response.success){
                console.log(response.data);
                $scope.groups = response.data;
            }else{
                console.log(response.message);
            }
            
        });
    };



    $scope.groups = [];
    /*for (var i = 0; i < 6; i++) {
        $scope.groups[i] = {
            name: i,
            items: []
        };
        for (var j = 1; j <= 3; j++) {
            $scope.groups[i].items.push(j + '. Nombre de algún producto ' + i);
        }
    }*/

    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };



    function getLast(myObj) {
        var keys = [];
        for (var k in myObj) {
            if (myObj.hasOwnProperty(k)) {
                keys.push(myObj[k]);
            }
        }
        keys.sort(); /*Organiza el arreglo*/
        keys.reverse(); /*Lo invierte para obtener el ultimo*/
        return keys[0];
    }

    function ordenarGrupos(myObj) {
        return(myObj);
    }

    function calcularPorcentaje(valor, maximo) {
        if (maximo === 0) {
            maximo = 0.1;
        }
        var porcentaje = (100 / maximo) * valor;
        if (porcentaje > 100) {
            porcentaje = 100;
        }
        return porcentaje;
    }

    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */
});