'use strict';

var app = angular.module('myApp.buscaPessoasPj', ['ngRoute','ngMaterial','ui.materialize', 'ui.mask'])


// Declared route
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/buscaPessoasPj', {
            templateUrl: 'views/buscaPessoasPj/buscaPessoasPj.html',
            controller:  'EndPjSofiaCtrl',
            controllerAs: 'vm'
        });
    }])













