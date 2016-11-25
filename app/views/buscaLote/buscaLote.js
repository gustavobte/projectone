'use strict';

var app = angular.module('myApp.buscaLote', ['ngRoute','ngMaterial','ui.materialize', 'ui.mask'])


// Declared route
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/buscaLote', {
            templateUrl: 'views/buscaLote/buscaLote.html',
            controller:  'BuscaLoteCtrl',
            controllerAs: 'vm'
        });
    }])
