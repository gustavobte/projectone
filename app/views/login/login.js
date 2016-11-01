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
        $rootScope.logado = false;
        // $(document).ready(function(){
        //     var classCycle=['imageCycle1','imageCycle2'];
        //
        //     var randomNumber = Math.floor(Math.random() * classCycle.length);
        //     var classToAdd = classCycle[randomNumber];
        //
        //     $('body').addClass(classToAdd);
        //
        // });


        $scope.submit = function () {
           // $rootScope.user = $scope.user;
           // $rootScope.password = $scope.password;

            if ($scope.user  == 'admin' && $scope.password == 'admin' || $scope.user  == 'gustavo' && $scope.password == 'gustavo' ){

                $rootScope.loggedIn = true;
                $rootScope.logado = true;
                $location.path('/home');
                var auth = true;

            }else{
                Materialize.toast('Usuário e/ou senha incorreto(s)', 4000) // 4000 is the duration of the toast
                $rootScope.loggedIn = false;
            }
        };
    });


