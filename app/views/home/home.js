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


app.controller('myctrl51', function ($scope) {

    $scope.addPoints = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    $scope.swapChartType = function () {
        if (this.chartConfig.options.chart.type === 'line') {
            this.chartConfig.options.chart.type = 'bar'
        } else {
            this.chartConfig.options.chart.type = 'line'
            this.chartConfig.options.chart.zoomType = 'x'
        }
    }

    $scope.toggleLoading = function () {
        this.chartConfig.loading = !this.chartConfig.loading
    }

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'column'
            }
        },
        series: [{
            name: [''],
            data: [95, 54, 39, 85, 70]
        }],
        title: {
            text: 'Fontes de Dados'
        },
        subtitle: {
            text: 'Fontes com maior numero de acerto'
        },
        xAxis: {
            categories: ['Detran', 'Procon', 'Celg', 'PM-GO','Saneago'],
            title: {
                enabled: true,
                text: 'Origem <b>Dados</b>',
                style: {
                    fontWeight: 'normal'
                }
            }
        },
        yAxis: [{
            title: {
                text: 'Quantidade de Acertos (%)'
            }
        }, {

            opposite: true
        }],


        loading: false
    }

});
app.controller('myctrl2', function ($scope) {


    $scope.addPoints = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
    };

    $scope.addSeries = function () {
        var rnd = []
        for (var i = 0; i < 10; i++) {
            rnd.push(Math.floor(Math.random() * 20) + 1)
        }
        $scope.chartConfig.series.push({
            data: rnd
        })
    }

    $scope.removeRandomSeries = function () {
        var seriesArray = $scope.chartConfig.series
        var rndIdx = Math.floor(Math.random() * seriesArray.length);
        seriesArray.splice(rndIdx, 1)
    }

    $scope.swapChartType = function () {
        if (this.chartConfig.options.chart.type === 'line') {
            this.chartConfig.options.chart.type = 'bar'
        } else {
            this.chartConfig.options.chart.type = 'line'
            this.chartConfig.options.chart.zoomType = 'x'
        }
    }

    $scope.toggleLoading = function () {
        this.chartConfig.loading = !this.chartConfig.loading
    }

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'line'
            }
        },
        series: [{
            name: [''],
            data: [95, 54, 39, 85, 70]
        }],
        title: {
            text: 'Variação de Endereço'
        },
        subtitle: {
            text: 'Maiores Variações'
        },
        xAxis: {
            categories: ['2012', '2013', '2014', '2015','2016'],
            title: {
                enabled: true,
                text: 'Data <b>Registro</b>',
                style: {
                    fontWeight: 'normal'
                }
            }
        },
        yAxis: [{
            title: {
                text: 'Quantidade de Acertos (%)'
            }
        }, {

            opposite: true
        }],


        loading: false
    }

});






