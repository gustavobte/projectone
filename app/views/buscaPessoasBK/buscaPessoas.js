'use strict';

var app = angular.module('myApp.buscaPessoas', ['ngRoute','ngMaterial','ui.materialize','highcharts-ng'])

app.controller('AppCtrlPessoa', function($scope, $mdSidenav) {
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
        $routeProvider.when('/buscaPessoas', {
            resolve:{
                "check": function ($location, $rootScope) {
                    if(!$rootScope.loggedIn){
                        $location.path('');
                    }
                }
            },
            templateUrl: 'buscaPessoas/buscaPessoas.html',
            controller: ''
        });
    }])

app.controller('myctrl', function ($scope) {


});







