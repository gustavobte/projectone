'use strict';

var app = angular.module('myApp.buscaPessoas', ['ngRoute','ngMaterial','ui.materialize'])


// Declared route
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/buscaPessoas', {
            templateUrl: 'views/buscaPessoas/buscaPessoas.html',
            controller: '',
            foodata: 'busca'
        });
    }])




app.controller('myctrl', function ($scope) {


});







