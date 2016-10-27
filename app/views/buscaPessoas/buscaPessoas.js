'use strict';

var app = angular.module('myApp.buscaPessoas', ['ngRoute','ngMaterial','ui.materialize', 'ui.mask'])


// Declared route
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/buscaPessoas', {
            templateUrl: 'views/buscaPessoas/buscaPessoas.html',
            controller:  'EndSofiaCtrl',
            controllerAs: 'vm'
        });
    }])













