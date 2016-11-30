'use strict';

var app = angular.module('myApp', ['ngCsv', 'ngSanitize', 'ngRoute','ngMaterial','ui.materialize',
  'myApp.home', 'myApp.buscaPessoas','myApp.buscaLote', 'myApp.resultadoBusca',
  'myApp.login','myApp.resultadoBuscaPj','myApp.buscaPessoasPj', 'myApp.controllers',
  'myApp.services', 'myApp.filters','ui.filters', 'myApp.directives']).


config(['$routeProvider', function($routeProvider) {

      $routeProvider.otherwise({
        redirectTo: '/login'
      });

}]);
