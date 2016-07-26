/*global angular*/

var dependencies = ['mobile-angular-ui', 'ngRoute'];

/*try {
    angular.module("ngMockE2E");
    dependencies.push("ngMockE2E");
} catch (err) {
}*/

var AsisconApp = angular.module('Asiscon', dependencies);

AsisconApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        'use strict';

        $locationProvider.html5Mode();

        $routeProvider.when('/', {
            templateUrl: 'view/home.html'
            , controller: 'HomeController'
        });
    }]);