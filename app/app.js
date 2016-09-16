'use strict';

angular.module('myApp', ['ngRoute', 'myApp.home','ui.materialize']).
config(['$routeProvider', function($routeProvider) {
  // Set defualt view of our app to login

  $routeProvider.otherwise({
    redirectTo: '/login'
  });
}]);