nutrifamiMobile.controller('TipsModuloController', function ($ionicPlatform, $scope, $location, $stateParams, AudioService, UsuarioService) {
    'use strict';
    /* BEGIN CORDOVA FILES
     $ionicPlatform.ready(function () {
     END CORDOVA FILES */

    $scope.usuarioActivo = UsuarioService.getUsuarioActivo();


    $scope.groups = [
        {
            name: "La Alimentación",
            items: [
                'Prevenga deficiencias de nutrientes consumiendo una alimentación variada y colorida.',
                'Modere el consumo de alimentos con grasas para tener una buena salud. Prefiera aceites vegetales.',
                'Prevenga deficiencias de nutrientes con el consumo de una alimentación variada y colorida.',
                'Consuma alimentos de todos los grupos, prefiera los de cosecha ya que serán más frescos, económicos y disponibles.'
            ]
        },
        {
            name: "Los Alimentos",
            items: [
                'Prevenga deficiencias de nutrientes consumiendo una alimentación variada y colorida.',
                'Modere el consumo de alimentos con grasas para tener una buena salud. Prefiera aceites vegetales.',
                'Prevenga deficiencias de nutrientes con el consumo de una alimentación variada y colorida.',
                'Consuma alimentos de todos los grupos, prefiera los de cosecha ya que serán más frescos, económicos y disponibles.'
            ]
        },
        {
            name: "El plato saludable",
            items: [
                'Prevenga deficiencias de nutrientes consumiendo una alimentación variada y colorida.',
                'Modere el consumo de alimentos con grasas para tener una buena salud. Prefiera aceites vegetales.',
                'Prevenga deficiencias de nutrientes con el consumo de una alimentación variada y colorida.',
                'Consuma alimentos de todos los grupos, prefiera los de cosecha ya que serán más frescos, económicos y disponibles.'
            ]
        },
        {
            name: "Los colores de los alimentos",
            items: [
                'Prevenga deficiencias de nutrientes consumiendo una alimentación variada y colorida.',
                'Modere el consumo de alimentos con grasas para tener una buena salud. Prefiera aceites vegetales.',
                'Prevenga deficiencias de nutrientes con el consumo de una alimentación variada y colorida.',
                'Consuma alimentos de todos los grupos, prefiera los de cosecha ya que serán más frescos, económicos y disponibles.'
            ]
        }
    ];
    
    $scope.clickTip = function (){
        console.log("Click Tip");
    };

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
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

    /* BEGIN CORDOVA FILES
     });
     END CORDOVA FILES */
});