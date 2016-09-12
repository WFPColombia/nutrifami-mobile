dependencies = ['ionic', 'ngCordova', 'Authentication', 'ngCookies', 'ngRoute', 'ionMDRipple'];

var nutrifamiLogin = angular.module('Authentication', []);
var nutrifamiMobile = angular.module('NutrifamiMobile', dependencies);

nutrifamiMobile.config(function ($stateProvider, $urlRouterProvider) {
    'use strict';
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
        views: {
            'menuContent': {
                templateUrl: 'views/modulo.html',
                controller: 'ModuloController'
            }
        }
    });
    
    $stateProvider.state('unidad', {
        url: '/capacitacion/:modulo/:leccion/:unidad',
                templateUrl: 'views/unidad.html',
                controller: 'UnidadController'
    });

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/capacitacion');
});

nutrifamiMobile.run(function ($ionicPlatform, $rootScope, $location, $cookieStore) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};

    nutrifami.getSessionId();
    nutrifami.training.initClient();

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
    });
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            /*cordova.plugins.Keyboard.disableScroll(true);*/

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});