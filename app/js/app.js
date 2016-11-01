'use strict';

var app = angular.module('myApp', ['ngRoute','ngMaterial','ui.materialize'
    ,'myApp.home', 'myApp.buscaPessoas', 'myApp.resultadoBusca', 'myApp.login','myApp.resultadoBuscaPj','myApp.buscaPessoasPj', 'myApp.controllers' , 'myApp.services']).


config(['$routeProvider', function($routeProvider) {

      $routeProvider.otherwise({
        redirectTo: '/login'
      });

}]);