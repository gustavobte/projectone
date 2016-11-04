//-----------ENDERECO SOFIA------------------------
controladores.controller('HomeSofiaCtrl', function ($scope, $rootScope, $location, HomeSofiaService) {


    var vm = this;
    $scope.x = true
    $scope.y = true
    $scope.z = true
    $scope.q = true
    $scope.topLoad = true

    HomeSofiaService.contarEnderecosProcessados().then(
        function (dados) {
            vm.quantidadeProcesssado = JSON.parse(dados)["values"][0][0];
            $scope.x = false

        }
    );

    HomeSofiaService.contarEnderecosEstruturados().then(
        function (dados) {

            vm.quantidadeEstruturado = JSON.parse(dados)["values"][0][0];
            $scope.y = false
        }
    );

    HomeSofiaService.contarEnderecosNaoEstruturados().then(
        function (dados) {

            vm.quantidadeNaoEstruturado = JSON.parse(dados)["values"][0][0];
            $scope.z = false
        }
    );

    HomeSofiaService.mediaOrigem().then(
        function (dados) {

            vm.mediaOrigemDados = JSON.parse(dados)["values"];

            $scope.mediaFonte();
            $scope.q = false
        }
    );

    HomeSofiaService.topCidades().then(
        function (dados) {

            vm.topCidades = JSON.parse(dados)["values"];
            $scope.topLoad = false
            $scope.topCidades();

        }
    );

    HomeSofiaService.bottomCidades().then(
        function (dados) {

            vm.bottomCidades = JSON.parse(dados)["values"];

            $scope.bottomLoad = false
            $scope.bottomCidades();

        }
    );


//MEDIA FONTE DE DADOS
    $scope.mediaFonte = function () {


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
                data: [vm.mediaOrigemDados[0][1],
                    vm.mediaOrigemDados[1][1],
                    vm.mediaOrigemDados[2][1],
                    vm.mediaOrigemDados[3][1],
                    vm.mediaOrigemDados[4][1],
                    vm.mediaOrigemDados[5][1],
                    vm.mediaOrigemDados[6][1]]
            }],
            title: {
                text: 'Top 10 Fontes de Dados'
            },
            subtitle: {
                text: 'Fontes de dados com MAIOR indice de acerto.'
            },
            xAxis: {
                categories: [vm.mediaOrigemDados[0][0],
                            vm.mediaOrigemDados[1][0],
                            vm.mediaOrigemDados[2][0],
                            vm.mediaOrigemDados[3][0],
                            vm.mediaOrigemDados[4][0],
                            vm.mediaOrigemDados[5][0],
                            vm.mediaOrigemDados[6][0]],
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
                    text: 'Quantidade de Media de Acertos (%)'
                }
            }, {

                opposite: true
            }],


            loading: false
        }
    }


//Top CIDADES
    $scope.topCidades = function () {


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

        while (vm.mediaOrigemDados[1][1] == undefined) {
            console.log(vm.mediaOrigemDados[1][1])
        }

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'column'
                }
            },
            series: [{
                name: [''],
                data: [vm.topCidades[0][1],
                    vm.topCidades[1][1],
                    vm.topCidades[2][1],
                    vm.topCidades[3][1],
                    vm.topCidades[4][1],
                    vm.topCidades[5][1],
                    vm.topCidades[6][1],
                    vm.topCidades[7][1],
                    vm.topCidades[8][1],
                    vm.topCidades[9][1]]
            }],
            title: {
                text: 'Top 10 Cidades'
            },
            subtitle: {
                text: 'Cidades com MAIOR pontuação.'
            },
            xAxis: {
                categories: [vm.topCidades[0][0],
                    vm.topCidades[1][0],
                    vm.topCidades[2][0],
                    vm.topCidades[3][0],
                    vm.topCidades[4][0],
                    vm.topCidades[5][0],
                    vm.topCidades[6][0],
                    vm.topCidades[7][0],
                    vm.topCidades[8][0],
                    vm.topCidades[9][0]],
                title: {
                    enabled: true,
                    text: '<b>Cidades</b>',
                    style: {
                        fontWeight: 'normal'
                    }
                }
            },
            yAxis: [{
                title: {
                    text: 'Quantidade de Media de Pontuação (%)'
                }
            }, {

                opposite: true
            }],


            loading: false
        }
    }

//Bottom CIDADES
    $scope.bottomCidades = function () {


        $scope.addPoints = function () {
            var seriesArray = $scope.chartConfig.series
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 50])
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

        while (vm.mediaOrigemDados[1][1] == undefined) {
            console.log(vm.mediaOrigemDados[1][1])
        }

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'column'
                }
            },
            series: [{
                name: [''],
                data: [vm.bottomCidades[0][1],
                    vm.bottomCidades[1][1],
                    vm.bottomCidades[2][1],
                    vm.bottomCidades[3][1],
                    vm.bottomCidades[4][1],
                    vm.bottomCidades[5][1],
                    vm.bottomCidades[6][1],
                    vm.bottomCidades[7][1],
                    vm.bottomCidades[8][1],
                    vm.bottomCidades[9][1]]
            }],
            title: {
                text: 'Top 10 Cidades '
            },
            subtitle: {
                text: 'Cidades com MENOR pontuação.'
            },
            xAxis: {
                categories: [vm.bottomCidades[0][0],
                    vm.bottomCidades[1][0],
                    vm.bottomCidades[2][0],
                    vm.bottomCidades[3][0],
                    vm.bottomCidades[4][0],
                    vm.bottomCidades[5][0],
                    vm.bottomCidades[6][0],
                    vm.bottomCidades[7][0],
                    vm.bottomCidades[8][0],
                    vm.bottomCidades[9][0]],
                title: {
                    enabled: true,
                    text: '<b>Cidades</b>',
                    style: {
                        fontWeight: 'normal'
                    }
                }
            },
            yAxis: [{
                title: {
                    text: 'Quantidade de Media de Pontuação (%)'
                }
            }, {

                opposite: true
            }],


            loading: false
        }
    }



});



