'use strict';

var app = angular.module('myApp.resultadoBusca', ['ngRoute','ngMaterial','ui.materialize'])


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
            templateUrl: 'views/resultadoBusca/resultadoBusca.html',
            controller:  'ResultSofiaCtrl'
        });
    }])









