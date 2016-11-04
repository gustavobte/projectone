'use strict';

var app = angular.module('myApp.resultadoBuscaPj', ['ngRoute', 'ngMaterial', 'ui.materialize'])

// Declared route
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/resultadoBuscaPj', {
        templateUrl: 'views/resultadoBuscaPj/resultadoBuscaPj.html',
        controller: 'ResultPjSofiaCtrl',
        controllerAs: 'vm'

    });
}])









