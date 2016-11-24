var filters = angular.module('myApp.filters', []);

filters.filter('joinBy', function () {
        return function (input,delimiter) {
            return (input || []).join(delimiter || ',');
        };
    });
