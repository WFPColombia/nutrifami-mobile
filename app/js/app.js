dependencies = ['ionic', 'ngCordova', 'Authentication', 'ngCookies', 'ngRoute', 'ionMDRipple', 'ionicLazyLoad'];

var nutrifamiLogin = angular.module('Authentication', []);
var nutrifamiMobile = angular.module('NutrifamiMobile', dependencies);

nutrifamiMobile.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    'use strict';
    $ionicConfigProvider.tabs.position('top');

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    });

    $stateProvider.state('intro', {
        url: '/intro',
        templateUrl: 'views/intro.html',
        controller: 'IntroController'
    });

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/template/menu.tpl.html',
        controller: 'NavController'
    });

    $stateProvider.state('app.capacitacion', {
        url: '/capacitacion',
        views: {
            'menuContent': {
                templateUrl: 'views/capacitacion.html',
                controller: 'CapacitacionController'
            }
        }

    });

    $stateProvider.state('app.modulo', {
        url: '/capacitacion/:modulo',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/modulo.html',
                controller: 'ModuloController'
            }
        }
    });

    $stateProvider.state('unidad', {
        url: '/capacitacion/:modulo/:leccion/:unidad',
        cache: false,
        templateUrl: 'views/unidad.html',
        controller: 'UnidadController'
    });

    $stateProvider.state('leccionTerminada', {
        url: '/capacitacion/:modulo/:leccion/:unidad/leccion-terminada',
        cache: false,
        templateUrl: 'views/leccionTerminada.html',
        controller: 'LeccionTerminadaController'
    });

    $stateProvider.state('app.perfil', {
        url: '/perfil',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/perfil.html',
                controller: 'PerfilController'
            }
        }

    });

    $stateProvider.state('app.editarPerfil', {
        url: '/editar-perfil',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/editarPerfil.html',
                controller: 'EditarPerfilController'
            }
        }

    });

    $stateProvider.state('app.compras', {
        url: '/compras',
        views: {
            'menuContent': {
                templateUrl: 'views/compras.html',
                controller: 'ComprasController'
            }
        }
    });

    $stateProvider.state('comprasGrupo', {
        url: '/compras/:grupo',
        templateUrl: 'views/comprasGrupo.html',
        controller: 'ComprasGrupoController'
    });

    $stateProvider.state('app.tips', {
        url: '/tips',
        views: {
            'menuContent': {
                templateUrl: 'views/tips.html',
                controller: 'TipsController'
            }
        }
    });

    $stateProvider.state('tipsModulo', {
        url: '/tips/:modulo',
        templateUrl: 'views/tipsModulo.html',
        controller: 'TipsModuloController'
    });

    $stateProvider.state('app.progreso', {
        url: '/progreso',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/progreso.html',
                controller: 'ProgresoController'
            }
        }
    });

    $stateProvider.state('sobre', {
        url: '/sobre',
        templateUrl: 'views/sobre.html',
        controller: 'SobreController'
    });

    $stateProvider.state('preload', {
        url: '/preload',
        templateUrl: 'views/preload.html',
        controller: 'PreloadController'
    });

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/capacitacion');
});

nutrifamiMobile.run(function($ionicPlatform, $rootScope, $location, $cookieStore) {
    console.log("Run");
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};

    nutrifami.getSessionId();

    $rootScope.$on('$locationChangeStart', function(event, next, current) {

        if ($location.path() === "") {
            $location.path('/preload');
        }
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser && $location.path() !== '/preload') {
            $location.path('/login');
        }
    });
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});
