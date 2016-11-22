//-----------ENDERECO SOFIA------------------------
controladores.controller('buscaLoteCtrl', function ($rootScope, $location, $scope, EnderecosSofiaService, ResultadoService) {

    var vm = this;

    $scope.listarEndereco = function (idPessoa) {
        $scope.loading = true;

        if (idPessoa !== null && idPessoa !== undefined && idPessoa !== '') {
            EnderecosSofiaService.listarEcByListaCPF().then(
                function (dados) {
                  console.log(dados)
                    vm.dadosId = '';
                    vm.dadosNome = '';
                    if (dados != "") {
                        vm.dadosId = JSON.parse(dados)["values"];
                    }
                    $scope.loading = false;
                },
                function () {
                    console.log("Erro ao localizar pessoa");
                });
        }
    }
});
