'use strict';

var app = angular.module('myApp.resultadoBusca', ['ngRoute','ngMaterial','ui.materialize','highcharts-ng'])

app.controller('AppCtrlResultado', function($scope, $mdSidenav) {
    $scope.showMobileMainHeader = true;
    $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };


})


app.controller('SwitchDemoCtrl', function($scope) {
    $scope.data = {
        cb1: true,
        cb4: true,
        cb5: false
    };

    $scope.message = 'false';

    $scope.onChange = function(cbState) {
        $scope.message = cbState;
    };
});

// Declared route
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/resultadoBusca', {
            templateUrl: 'resultadoBusca/resultadoBusca.html',
            controller: ''
        });
    }])

app.controller('myctrl', function ($scope) {


});







