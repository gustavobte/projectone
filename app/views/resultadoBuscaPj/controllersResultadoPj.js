//-----------PESSOA SOFIA------------------------
controladores.controller('ResultPjSofiaCtrl', function ($scope, $location, $rootScope, ResultadosPjSofiaService, ResultadosSofiaService) {

    var vm = this;
    vm.dadosId = '';
    vm.dadosNome = '';
    vm.numDocumento = '';
    vm.idEnderecoFavorito = 0;
    vm.telFavorito = "";

    vm.obtemFavorito = function (numDocumento) {
        ResultadosSofiaService.buscaFavorito(numDocumento).then(
            function (response) {
                if (response[0] != null) {
                    vm.idEnderecoFavorito = response[0].ec_eck_favoritos.ecFavorito;
                    vm.telFavorito = response[0].ec_eck_favoritos.telFavorito;
                }
            },
            function (response) {
                console.log(response);
            }
        );
    };

    vm.obtemTelefones = function (listaEcs) {
        var listaTelefones = [];
        for (var i = 0; i < listaEcs.length; i++) {
            if (listaTelefones.indexOf(listaEcs[i][20]) == -1) {
                listaTelefones.push(listaEcs[i][20])
            }
        }
        debugger;
        return listaTelefones;
    };

    vm.listarResultadocpf = function () {
        ResultadosPjSofiaService.listarResultadosPj().then(
            function (dados) {
                vm.dadosId = '';
                if (dados != "") {
                    vm.dadosId = JSON.parse(dados)["values"];
                    vm.telefones = vm.obtemTelefones(vm.dadosId);
                    vm.numDocumento = vm.dadosId[0][3];
                    vm.obtemFavorito(vm.dadosId[0][3]);
                }
                $scope.resultadoLoad = false;
            },
            function () {
                console.log("Erro ao localizar Endereço");
            });
    };

    vm.onChangeEndereco = function (ec) {
        ResultadosSofiaService.verificarExistePessoaCadastrada(ec[3]).then(
            function (dados) {
                if (dados.length > 0) {
                    if (vm.idEnderecoFavorito == ec[0]) {
                        ResultadosSofiaService.atualizarFavorito(ec[3], 0).then(
                            function (dados) {
                                console.log(dados);
                            },
                            function (dados) {
                                console.log(dados);
                            });
                        vm.idEnderecoFavorito = 0;
                    } else if (vm.idEnderecoFavorito == 0) {
                        ResultadosSofiaService.atualizarFavorito(ec[3], ec[0]).then(
                            function () {
                                vm.idEnderecoFavorito = ec[0];
                            },
                            function (dados) {
                                console.log(dados);
                            });
                    }
                } else {
                    ResultadosSofiaService.addECFavorito(ec[3], ec[0]).then(
                        function (dados) {
                            console.log(dados);
                        },
                        function (dados) {
                            console.log(dados);
                        });
                }
            },
            function (response) {
                console.log(response);
            }
        );
    };

    vm.onChangeTelefone = function (ec) {
        ResultadosSofiaService.verificarExistePessoaCadastrada(vm.numDocumento).then(
            function (dados) {
                console.log(dados);
                if (dados.length > 0) {
                    if (vm.telFavorito == ec) {
                        ResultadosSofiaService.atualizarTelFavorito(vm.numDocumento, "").then(
                            function (dados) {
                                console.log(dados);
                            },
                            function (dados) {
                                console.log(dados);
                            });
                        vm.telFavorito = "";
                    } else if (vm.telFavorito == "") {
                        ResultadosSofiaService.atualizarTelFavorito(vm.numDocumento, ec).then(
                            function () {
                                vm.telFavorito = ec;
                            },
                            function (dados) {
                                console.log(dados);
                            });
                    }
                } else {
                    ResultadosSofiaService.addTelFavorito(vm.numDocumento, ec).then(
                        function (dados) {
                            console.log(dados);
                        },
                        function (dados) {
                            console.log(dados);
                        });
                }
            },
            function (response) {
                console.log(response);
            }
        );
    };

    vm.listarResultadocpf();
});