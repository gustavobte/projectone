'use strict';

var app = angular.module('myApp.resultadoBusca', ['ngRoute','ngMaterial','ui.materialize'])

// Declared route
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/resultadoBusca', {
            templateUrl: 'views/resultadoBusca/resultadoBusca.html',
            controller:  'ResultSofiaCtrl',
            controllerAs: 'vm'
        });
    }])









