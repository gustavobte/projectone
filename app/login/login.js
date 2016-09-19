'use strict';

var app = angular.module('myApp.login', ['ngRoute'])

// Declared route
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'MinMaxCtrl'
        });
    }])

    // Home controller
    app.controller('MinMaxCtrl', function($scope, $http) {
        $scope.formModel = {};

        $scope.onSubimit = function () {
        console.log("Submit Ok!!");
        console.log($scope.formModel);


        };

    });


