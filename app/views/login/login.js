'use strict';

var app = angular.module('myApp.login', ['ngRoute','ui.materialize'])

// Declared route
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl'
        });


    }])

    app.controller('LoginCtrl', function($scope,$location, $rootScope) {
        $scope.submit = function () {
           // $rootScope.user = $scope.user;
           // $rootScope.password = $scope.password;

            if ($scope.user  == 'admin' && $scope.password == 'admin' || $scope.user  == 'gustavo' && $scope.password == 'gustavo' ){
                $rootScope.loggedIn = true;
                $location.path('/home');
                var auth = true;

                console.log("Bem Vindo " + $scope.user);
            }else{
                Materialize.toast('Usuário e/ou senha incorreto(s)', 4000) // 4000 is the duration of the toast
            }
        };
    });


