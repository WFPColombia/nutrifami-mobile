/*global angular*/

dependencies = ['Authentication', 'ngRoute', 'ngCookies', 'ngAudio', 'bsLoadingOverlay', 'mobile-angular-ui', 'ngAnimate','ngCordova'];

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
        
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'views/home.html'
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }]);

nutrifamiMobile.run(['$rootScope', '$location', '$cookieStore', 'bsLoadingOverlayService',
    function ($rootScope, $location, $cookieStore, bsLoadingOverlayService) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};

        nutrifami.getSessionId();

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }
]);
