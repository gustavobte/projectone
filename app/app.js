'use strict';

angular.module('myApp', ['ngRoute', 'myApp.login','ui.materialize','myApp.home', 'myApp.buscaPessoas']).
config(['$routeProvider', function($routeProvider) {
  // Set defualt view of our app to login

  $routeProvider.otherwise({
    redirectTo: '/buscaPessoas'
  });
}]);