//-----------ENDERECO SOFIA------------------------
controladores.controller('BuscaLoteCtrl', function($rootScope, $location, $scope, EnderecosSofiaService, ResultadoService) {
    var vm = this;

    vm.cpf = '';

    vm.dados = {
        cpf: []
    };

    $scope.addFormField = function() {
        if (vm.cpf != "") {
            vm.dados.cpf.push("'"+'000'+vm.cpf+"'");
            vm.cpf = '';
        }
    }

    $scope.submitTable = function() {
        console.log($scope.table);
    }

    vm.setPessoa = function(ec_id) {
        ResultadoService.setPessoa(ec_id);
    };

    $scope.listarEcByListaCPF = function() {
        $scope.loading = true;

        // if (idPessoa !== null && idPessoa !== undefined && idPessoa !== '') {
            EnderecosSofiaService.listarEcByListaCPF(vm.dados.cpf).then(
                function(dados) {
                    vm.dadosId = '';
                    vm.dadosNome = '';
                    if (dados != "") {
                        vm.dadosId = JSON.parse(dados)["values"];
                    }
                    $scope.loading = false;
                },
                function() {
                    console.log("Erro ao localizar pessoa");
                });
        // }
    }
});
