'use strict';

var app = angular.module('myApp.home', ['ngRoute','ngMaterial','ui.materialize','highcharts-ng'])

app.controller('NavCtrl', function($rootScope, $scope, $mdSidenav) {

    $rootScope.logado = true;
    $scope.showMobileMainHeader = true;
    $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };

})



// Declared route
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            resolve:{
            "check": function ($location, $rootScope) {
                if(!$rootScope.loggedIn){
                    $location.path('/home');
                }
            }
            },
            templateUrl: 'views/home/home.html',
            controller: 'HomeSofiaCtrl',
            controllerAs: 'vm'

        });
    }])









