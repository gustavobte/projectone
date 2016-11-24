//-----------ENDERECO SOFIA------------------------
controladores.controller('BuscaLoteCtrl', function ($rootScope, $location, $scope, EnderecosSofiaService, ResultadoService) {
    var vm = this;

    vm.cpf = '';

    vm.dados = {
        cpf: []
    };

    vm.cardsPraExportacao = []

    $scope.addFormField = function () {
        if (vm.cpf != "") {
            vm.dados.cpf.push("'" + '000' + vm.cpf + "'");
            vm.cpf = '';
        }
    }

    $scope.submitTable = function () {
        console.log($scope.table);
    }

    vm.setPessoa = function (ec_id) {
        ResultadoService.setPessoa(ec_id);
    };

    $scope.listarEcByListaCPF = function () {
        $scope.loading = true;

        EnderecosSofiaService.listarEcByListaCPF(vm.dados.cpf).then(
            function (dados) {
                if (dados != "") {
                    vm.dadosId = JSON.parse(dados)["values"];
                }
                console.log(vm.dadosId)
                $scope.loading = false;
                vm.dados = {
                    cpf: []
                };
                vm.cardsPraExportacao = []
            },
            function () {
                $scope.loading = false;
                console.log("Erro ao localizar pessoa");
                vm.dados = {
                    cpf: []
                };
                vm.cardsPraExportacao = []
            });
    }


    vm.onChangeCard = function (pessoa) {

        vm.enderecoCSV = {
            "nome": pessoa[0],
            "logradouro": pessoa[1]+" "+pessoa[2],
            "quadraLote": pessoa[3],
            "bairro": pessoa[4],
            "estado": pessoa[5]+"-"+pessoa[6],
            "cep": pessoa[7]
        };

        var index = vm.cardsPraExportacao.indexOf(vm.enderecoCSV);

        if (index == -1) {
            console.log("acrescentando pessoa na lista para exportação");
            vm.cardsPraExportacao.push(vm.enderecoCSV)
        } else {
            console.log("removendo pessoa na lista para exportação");
            vm.cardsPraExportacao.splice(index, 1)
        }
    };

});
