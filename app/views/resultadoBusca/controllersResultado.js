//-----------PESSOA SOFIA--vm.dadosNome = JSON.parse(dados)["values"];----------------------
controladores.controller('ResultSofiaCtrl', function ($scope, $location, $rootScope, ResultadosSofiaService, ResultadoService) {

    var vm = this;
    vm.dadosId = '';
    vm.dadosNome = '';
    $scope.favorito = false;
    $scope.resultadoLoad = true;
    vm.idEnderecoFavorito = 0;

    vm.obtemFavorito = function (numDocumento) {
        ResultadosSofiaService.buscaFavorito(numDocumento).then(
            function (response) {
                if (response[0] != null) {
                    vm.idEnderecoFavorito = response[0].ec_eck_favoritos.ecFavorito;
                }
            },
            function (response) {
                console.log(response);
            }
        );
    };

    vm.obtemTelefones = function(listaEcs){
        var listaTelefones = [];

        for(var i = 0; i < listaEcs.length; i++){
            if(listaTelefones.indexOf(listaEcs[i][20]) == -1){
                listaTelefones.push(listaEcs[i][20])
            }
        }
        return listaTelefones;
    };

    vm.listarResultados = function () {
        ResultadosSofiaService.listarResultados().then(
            function (dados) {
                if (dados != '') {
                    vm.listaDados = JSON.parse(dados)["values"];
                    vm.telefones = vm.obtemTelefones(vm.listaDados);
                    vm.obtemFavorito(vm.listaDados[0][3]);
                }
                $scope.resultadoLoad = false;
            },
            function (response) {
                console.log(response);
            }
        );
    };

    $scope.onChangeEndereco = function (ec) {
        // EC[3] = numDocumento || EC[0] = idEc
        if (vm.idEnderecoFavorito == ec[0]) {
            ResultadosSofiaService.atualizarFavorito(ec[3]).then(
                function (dados) {
                    console.log(dados)
                },
                function (dados) {
                    console.log(dados);
                });
        } else {
            ResultadosSofiaService.addECFavorito(ec[3], ec[0]).then(
                function (dados) {
                    console.log(dados)
                },
                function (dados) {
                    console.log(dados);
                });

        }
    };

    $scope.onChangeTelefone = function () {
        // TODO: implementar
    };

    vm.listarResultados();

});