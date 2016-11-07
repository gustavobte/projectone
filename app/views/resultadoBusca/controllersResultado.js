//-----------PESSOA SOFIA------------------------
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
                    console.log("ID Endereço favorito: " + vm.idEnderecoFavorito)
                }
            },
            function (response) {
                console.log(response);
            }
        );
    };

    vm.listarResultados = function () {
        ResultadosSofiaService.listarResultados().then(
            function (dados) {
                vm.listaDados = JSON.parse(dados)["values"];
                if (vm.listaDados[0] != undefined) {
                    vm.obtemFavorito(vm.listaDados[0][3]);
                }
                $scope.resultadoLoad = false;
            },
            function () {
                console.log("Erro ao listar resultados");
            }
        );
    };

    $scope.onChangeEndereco = function (ec) {
        // EC[3] = numDocumento || EC[0] = idEc
        if (vm.idEnderecoFavorito == ec[0]) {
            ResultadosSofiaService.atualizarFavorito(ec[3])
        } else {
            ResultadosSofiaService.addECFavorito(ec[3], ec[0]).then(
                function (dados) {
                    console.log(dados)
                },
                function (dados) {
                    console.log(dados);
                });
            vm.listarResultados();
        }
    };

    $scope.onChangeTelefone = function () {
        // TODO: implementar
    };

    vm.listarResultados();

});