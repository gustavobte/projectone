'use strict';

var app = angular.module('myApp', ['ngRoute','ngMaterial','ui.materialize'
    ,'myApp.home', 'myApp.buscaPessoas', 'myApp.resultadoBusca']).


config(['$routeProvider', function($routeProvider) {
  // Set defualt view of our app to login

      $routeProvider.otherwise({
        redirectTo: '/'
      });




}]);