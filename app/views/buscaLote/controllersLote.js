//-----------ENDERECO SOFIA------------------------
controladores.controller('BuscaLoteCtrl', function($rootScope, $location, $scope, EnderecosSofiaService, ResultadoService) {
    var vm = this;

    vm.cpf = '';

    vm.dados = {
        cpf: []
    };

    $scope.addFormField = function() {
        if (vm.cpf != "") {
            vm.dados.cpf.push("'" + '000' + vm.cpf + "'");

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

        EnderecosSofiaService.listarEcByListaCPF(vm.dados.cpf).then(
            function(dados) {
                if (dados != "") {
                    vm.dadosId = JSON.parse(dados)["values"];
                }
                $scope.loading = false;
                vm.dados.cpf = '';
            },
            function() {
                $scope.loading = false;
                console.log("Erro ao localizar pessoa");
                vm.dados.cpf = '';
            });
    }
});
