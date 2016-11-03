'use strict';

var app = angular.module('myApp.resultadoBuscaPj', ['ngRoute','ngMaterial','ui.materialize'])


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
        $routeProvider.when('/resultadoBuscaPj', {
            templateUrl: 'views/resultadoBuscaPj/resultadoBuscaPj.html',
            controller:  'ResultPjSofiaCtrl',
            controllerAs: 'vm'

        });
    }])









