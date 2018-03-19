// 'use strict';

/**
 * @ngdoc overview
 * @name authApp
 * @description
 * # authApp
 *
 * Main module of the application.
 */

/*jshint -W079 */

var app = angular
    .module('authApp', [
        'ui.router',
        'ngResource'
        // 'socialLogin'
    ])
    
    .config(['$stateProvider', '$urlRouterProvider','$httpProvider', function ($stateProvider, $urlRouterProvider,$httpProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            //login
            .state('login', {
                url: '/login',
                controller: 'loginCtrl',
                // templateUrl: 'views/vehicle.html'
                templateUrl: 'views/menu.html'
            })
            .state('ms', {
                url: '/msdrive',
                controller: 'loginCtrl',
                // templateUrl: 'views/menu.html'
                templateUrl: 'views/placeorder.html'
            })
            .state('property', {
                url: '/properties',
                controller: 'propertyCtrl',
                templateUrl: 'views/property.html'
            })
            .state('vehicles', {
                url: '/vehicles',
                controller: 'vehicleCtrl',
                templateUrl: 'views/vehicle.html'
            })
            .state('googleDrive', {
                url: '/google-drive',
                templateUrl: 'views/googleDrive.html'
            })

            .state('chatbots', {
                url: '/chatbots',
                templateUrl: 'views/chatbots.html'
            })


    }])






