nutrifamiMobile.controller('ModuloCtrl', function($ionicPlatform, $scope, $rootScope, $location, $stateParams, $ionicViewSwitcher, MediaService, UsuarioService, UserService, CapacitacionService,DescargaService) {
    'use strict';
    $ionicPlatform.ready(function() {

        var media = [];
        CapacitacionService.initClient();
        $scope.modulo = CapacitacionService.getModulo($stateParams.modulo);
        $scope.usuarioActivo = UserService.getUser();
        $scope.lecciones = [];
        
        $scope.assetpath = $rootScope.TARGETPATH+$stateParams.capacitacion+"/"+$stateParams.modulo+"/";
        console.log($scope.assetpath);

        $scope.audios = {
                'audioTitulo': $scope.assetpath + $scope.modulo.titulo.audio.nombre,
                'audioDescripcion': $scope.assetpath + $scope.modulo.descripcion.audio.nombre
            };


        $scope.modulo.totalLecciones = 0;

        $scope.lids = nutrifami.training.getLeccionesId($stateParams.modulo);
        $scope.audiosDescargados = DescargaService.paqueteDescargado('modulos',  $stateParams.modulo, 'audios');
        
        


        function cargarCapacitacion() {
            for (var lid in $scope.lids) {
                var tempLeccion = nutrifami.training.getLeccion($scope.lids[lid]);

                if (tempLeccion.activo == 1) {

                    if (tempLeccion.titulo.audio.nombre !== null) {
                        var id = parseInt(lid) + 1;
                        tempLeccion.titulo.audio.id = "paso" + id;
                        $scope.audios[tempLeccion.titulo.audio.id] = $scope.assetpath +$scope.lids[lid]+"/"+tempLeccion.titulo.audio.nombre;
                    }
                    $scope.modulo.totalLecciones++;
                    $scope.lecciones.push(tempLeccion);
                }
            }
            console.log($scope.audios);
            if($scope.audiosDescargados){
                MediaService.preloadSimple($scope.audios);
            }
        }

        $scope.playAudio = function(audio) {
            MediaService.play(audio, $scope.audios);
        };

        $scope.porcentajeAvance = function() {
            return (100 / $scope.modulo.totalLecciones * $scope.usuarioAvance.leccionesTerminadas);
        };
        $scope.irALeccion = function(index) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            if($scope.audiosDescargados){
            MediaService.unload($scope.audios);
        }
            $location.path('/'+$stateParams.capacitacion+'/' + $stateParams.modulo + "/" + $scope.lids[index] + "/1");
        };

        $scope.$on("$ionicView.enter", function(event, data) {
            

        });

        cargarCapacitacion();

        $scope.$on("$ionicView.beforeLeave", function(event, data) {
            if($scope.audiosDescargados){
            MediaService.unload($scope.audios);
        }
        });
    });

});
