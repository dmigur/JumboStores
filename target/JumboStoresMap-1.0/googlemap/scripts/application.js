'use strict';

console.log("application.js");

var dnsApp = angular.module('dnsApp', ['ngRoute', 'ui.router', 'ngResource']);

dnsApp.config(['$httpProvider', function ($httpProvider, $locationProvider) {

    $httpProvider.defaults.timeout = 500000000;

}]);

dnsApp.config(['$locationProvider',

    function ($locationProvider) {

        $locationProvider.hashPrefix('!');

    }
]);




