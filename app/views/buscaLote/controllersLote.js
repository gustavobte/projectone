//-----------ENDERECO SOFIA------------------------
controladores.controller('BuscaLoteCtrl', function($rootScope, $location, $scope, EnderecosSofiaService, ResultadoService) {
    var vm = this;

    vm.cpf = '';

    vm.dados = {
        cpf: []
    };

    vm.cardsPraExportacao = []

    $scope.submitTable = function() {
        console.log($scope.table);
    }

    vm.setPessoa = function(ec_id) {
        ResultadoService.setPessoa(ec_id);
    };

    $scope.listarEcByListaCPF = function() {
        $scope.loading = true;

        var cpf = vm.cpf.replace(/ /g,'').split(",")
        for (var i = 0; i < vm.cpf.length; i++) {
            vm.dados.cpf.push("'000" + cpf[i] + "'");
        }

        EnderecosSofiaService.listarEcByListaCPF(vm.dados.cpf).then(
            function(dados) {
                if (dados != "") {
                    vm.dados = JSON.parse(dados)["values"];
                }
                $scope.loading = false
                vm.cardsPraExportacao = []
            },
            function() {
                $scope.loading = false;
                console.log("Erro ao localizar pessoa");
                vm.dados = {
                    cpf: []
                };
                vm.cardsPraExportacao = []
            });
    }


    vm.onChangeCard = function(pessoa) {
        var index = vm.cardsPraExportacao.indexOf(pessoa)
        if (index == -1) {
            console.log("acrescentando pessoa na lista para exportação");
            vm.cardsPraExportacao.push(pessoa)
        } else {
            console.log("removendo pessoa na lista para exportação");
            vm.cardsPraExportacao.splice(index, 1)
        }
    };

});
