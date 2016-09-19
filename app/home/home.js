'use strict';

var app = angular.module('myApp.home', ['ngRoute','ngMaterial','ui.materialize'])

app.controller('AppCtrl', function($scope, $mdSidenav) {
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
            templateUrl: 'home/home.html',
            controller: ''
        });
    }]);


