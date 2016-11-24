//-----------ENDERECO SOFIA------------------------
controladores.controller('BuscaLoteCtrl', function($rootScope, $location, $scope, EnderecosSofiaService, ResultadoService) {
    var vm = this;

    vm.cpf = '';
    vm.delimiter = ',';
    vm.cardsPraExportacao = []

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

        vm.dados = {cpf: []};

        var cpf = vm.cpf.replace(/ /g, '').split(vm.delimiter)
        for (var i = 0; i < cpf.length; i++) {
            vm.dados.cpf.push("'000" + cpf[i] + "'");
        }

        EnderecosSofiaService.listarEcByListaCPF(vm.dados.cpf).then(
            function(dados) {
                if (dados != "") {
                    vm.dados = vm.formataPessoa(JSON.parse(dados)["values"]);
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

    vm.formataPessoa = function(dados) {
        var listaPessoas = [];
        for (var i = 0; i < dados.length; i++) {
            var pessoa = {
                "nome": dados[i][4],
                "logradouro": dados[i][5] + " " + dados[i][6],
                "quadraLote": dados[i][10],
                "bairro": dados[i][11],
                "estado": dados[i][13] + "-" + dados[i][14],
                "cep": dados[i][12]
            };
            listaPessoas.push(pessoa);
        }

        return listaPessoas;
    }

    vm.onChangeBox = function(pessoa) {

        var index = vm.cardsPraExportacao.indexOf(pessoa);

        if (index == -1) {
            console.log("acrescentando pessoa na lista para exportação");
            vm.cardsPraExportacao.push(pessoa);
        } else {
            console.log("removendo pessoa na lista para exportação");
            vm.cardsPraExportacao.splice(index, 1)
        }
    };

});
