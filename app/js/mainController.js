/*global angular*/

dependencies = ['Authentication', 'ngRoute', 'ngCookies', 'ngAudio', 'bsLoadingOverlay', 'mobile-angular-ui', 'ngAnimate', 'ngCordova','ui.swiper'];

var nutrifamiLogin = angular.module('Authentication', []);
var nutrifamiMobile = angular.module('NutrifamiMobile', dependencies);

nutrifamiMobile.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        'use strict';

        $locationProvider.html5Mode();

        $routeProvider.when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/login.html',
            hideMenus: true
        });
        
        $routeProvider.when('/intro', {
            controller: 'IntroController',
            templateUrl: 'views/intro.html',
            hideMenus: true
        });

        $routeProvider.when('/file', {
            controller: 'FileController',
            templateUrl: 'views/file.html',
            hideMenus: true
        });

        $routeProvider.when('/', {
            controller: 'CapacitacionController',
            templateUrl: 'views/capacitacion.html'
        });

        $routeProvider.when('/m/:modulo', {
            controller: 'ModuloController',
            templateUrl: 'views/modulo.html'
        });

        $routeProvider.when('/m/:modulo/:leccion/:unidad', {
            controller: 'UnidadController',
            templateUrl: 'views/unidad.html'
        });

        $routeProvider.when('/m/:modulo/:leccion/:unidad/leccion-terminada/', {
            controller: 'LeccionTerminadaController',
            templateUrl: 'views/leccionTerminada.html'
        });
        
         $routeProvider.when('/consumo', {
            controller: 'ConsumoController',
            templateUrl: 'views/consumo.html'
        });

        $routeProvider.when('/perfil', {
            controller: 'PerfilController',
            templateUrl: 'views/perfil.html'
        });

        $routeProvider.when('/editar-perfil', {
            controller: 'EditarPerfilController',
            templateUrl: 'views/editarPerfil.html'
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }]);

nutrifamiMobile.run(['$rootScope', '$location', '$cookieStore', 'bsLoadingOverlayService',
    function ($rootScope, $location, $cookieStore, bsLoadingOverlayService) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        nutrifami.getSessionId();
        nutrifami.training.initClient();
        
        bsLoadingOverlayService.setGlobalConfig({
		templateUrl: 'views/template/loading-overlay-tpl.html'
	});

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }
]);
