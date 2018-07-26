nf2.directive('moduleDrt', function($state, $rootScope, $ionicLoading, $ionicPopup, $stateParams, $filter, DownloadService, UserService, CapacitationService) {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'directives/module/module.drt.html',
    link: function($scope) {

      $scope.cargadorTexto = "Preparando archivos para la descarga";
      $scope.cargadorPorcentaje = 0;

      $scope.icon_descarga = $rootScope.ICON_DESCARGA;
      $scope.avance = UserService.getAvanceModulo($scope.info.id);


      if ($rootScope.isMobile) {
        $scope.assetpath = $rootScope.TARGETPATH_IMAGES + $stateParams.capacitation + "/" + $scope.info.id + "/";
      } else {
        $scope.assetpath = $rootScope.TARGETPATH_IMAGES;
      }


      var optDescarga = {
        template: "<h3>{{'Descargando archivos necesarios!' | translate }}</h3>{{cargadorTexto | translate }}<h4>{{cargadorPorcentaje}}%</h4>",
        scope: $scope
      };

      $scope.totalLecciones = function() {
        var totalLecciones = 0;
        for (var lid in $scope.info.lecciones) {
          var tempLeccion = CapacitationService.getLesson($scope.info.lecciones[lid]);
          if (tempLeccion.activo === 1) {
            totalLecciones++;
          }
        }
        return (totalLecciones);
      };

      $scope.paqueteDescargado = function() {
        return DownloadService.paqueteCompletoDescargado('modulos', $scope.info.id);
      };


      $scope.irAlModulo = function() {
        if (DownloadService.paqueteDescargado('modulos', $scope.info.id, 'imagenes')) {
          $state.go('nf.cap_module', {
            capacitation: $stateParams.capacitation,
            module: $scope.info.id
          });
        } else {

          if (DownloadService.isOnline()) {
            $scope.descargarPaqueteCompleto();
          }
        }
      };

      $scope.abrirDescargas = function() {
        $scope.modal = {
          texto1: '¿Desea descargar el módulo con audios?',
          texto2: 'Descargar el módulo con audios le permitirá escuchar las lecciones, pero la descarga tomará más tiempo',
          estado: 'alert' // ok, alert, error
        };
        $ionicPopup.show({
          templateUrl: 'modals/simple/simple.modal.html',
          scope: $scope,
          cssClass: 'salir-unidad',
          buttons: [{
            text: $filter('translate')('Cancelar'),
            type: 'button-positive',
            onTap: function(e) {}
          }, {
            text: $filter('translate')('Descargar módulo'),
            type: 'button-positive',
            onTap: function(e) {
              $scope.descargarPaqueteCompleto();
            }
          }]
        });
      };

      $scope.descargarPaqueteCompleto = function() {
        console.log("Descargar todo el modulo");
        $ionicLoading.show(optDescarga);
        DownloadService.descargarPaqueteCompleto('modulos', $scope.info.id);

      };

      $scope.$on('actualizarCargador', function(event, response) {
        $scope.cargadorTexto = response.mensaje;
        $scope.cargadorPorcentaje = response.porcentaje;
      });

    }
  };
});