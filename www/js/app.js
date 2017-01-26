// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            var APPLICATION_ID = 'EDD5EF81-B116-0283-FFBC-882039CBD300',
                SECRET_KEY = 'B3852464-61E5-D482-FF68-F55728885300',
                VERSION = 'v1'; //default application version;
            Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
            /*Backendless.enablePromises();*/
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
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('tab', {
                url: '/tabs',
                abstract: true,
                templateUrl: 'templates/tabs.html',
                controller: 'AppCtrl'
            })

            .state('tab.sobre', {
                url: '/sobre',
                views: {
                    'tab-sobre': {
                        templateUrl: 'templates/sobre.html',
                        controller: 'SobreCtrl'
                    }
                    }
                })

            .state('tab.pedido', {
                url: '/pedido',
                views: {
                    'tab-pedido': {
                        templateUrl: 'templates/pedido.html',
                        controller: 'PedidoCtrl'
                    }
                }
            })

            .state('tab.conta', {
                url: '/conta',
                views: {
                    'tab-conta': {
                        templateUrl: 'templates/conta.html',
                        controller: 'ContaCtrl'
                    }
                }
            })

            .state('cadastrar', {
                url: '/cadastrar',
                templateUrl: 'templates/cadastrar.html',
                controller: 'CadCtrl'
            })
            .state('senha', {
                url: '/senha',
                templateUrl: 'templates/senha.html',
                controller: 'PassCtrl'
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('login');

    });
