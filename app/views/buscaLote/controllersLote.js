//-----------ENDERECO SOFIA------------------------
controladores.controller('BuscaLoteCtrl', function ($rootScope, $location, $filter, $scope, LoteSofiaService, ResultadoService) {

    $(document).ready(function () {
        $('select').material_select();
    });

    var vm = this;

    vm.cpfsImportados = '';
    vm.delimiter = ',';
    vm.cardsPraExportacao = [];
    vm.chek = false;

    $scope.carregarConteudo = function ($fileContent) {
        vm.cpfsImportados = $fileContent;
    };

    vm.filtraCpfs = function (cpfs) {
        var cpfFiltrado = new RegExp("[^\\d\\" + vm.delimiter + "]", "g");
        return cpfs.replace(cpfFiltrado, "")
    };

    vm.limpaVars = function () {
        vm.dados = {
            cpf: []
        };
    };

    vm.substituiLinhasPorDelimitador = function (dados, delimitador) {
        return dados.replace(/\n/g, delimitador);
    };

    vm.montaCPFS = function (dados, delimiter) {
        var dadosDelimitados = vm.substituiLinhasPorDelimitador(dados, delimiter);
        return vm.filtraCpfs(dadosDelimitados).split(delimiter);
    };

    $scope.listarEcByListaCPF = function () {
        $scope.loading = true;

        vm.limpaVars();

        var cpfs = vm.montaCPFS(vm.cpfsImportados, vm.delimiter);

        for (var i = 0; i < cpfs.length; i++) {
            var zeros = cpfs[i].length == 11 ? '000' : '';
            vm.dados.cpf.push("'" + zeros + cpfs[i] + "'");
        }

        var blocoDezMil = [],
            size = 5000;

        vm.resultado = [];

        while (vm.dados.cpf.length > 0)
            blocoDezMil.push(vm.dados.cpf.splice(0, size));

        for (i = 0; i <= blocoDezMil.length; i++) {
            $scope.loading = true;
            LoteSofiaService.listarEcByListaCPF(blocoDezMil[i]).then(
                function (dados) {
                    if (dados != "") {
                        vm.resultado = vm.resultado.concat(vm.formataPessoa(JSON.parse(dados)["values"]));
                    } else {
                        vm.resultado = [];
                    }

                },
                function () {
                    console.log("Erro ao localizar pessoa");
                    vm.dados = {
                        cpf: []
                    };
                }).then(
                function () {
                    vm.cardsPraExportacao = []
                    for (i = 0; i < vm.resultado.length; i++) {
                        vm.onChangeBox(vm.resultado[i])
                    }
                }
            );
            if (i == blocoDezMil.length) {
                $scope.loading = false;
            }
        }

    }

    vm.formataPessoa = function (dados) {
        var listaPessoas = [];
        for (var i = 0; i < dados.length; i++) {

            var numDocumento;
            var telefone;

            if (dados[i][2] == "J") {
                numDocumento = dados[i][3]
            } else {
                numDocumento = dados[i][3].substring(3, 14)
            }

            telefone = dados[i][20] ? dados[i][20].split(" - ") : "-"

            var pessoa = {
                "nome": dados[i][19],
                "logradouro": dados[i][5] + " " + dados[i][6],
                "quadraLote": dados[i][10],
                "bairro": dados[i][11],
                "estado": dados[i][13] + "-" + dados[i][14],
                "cep": dados[i][12],
                "telefone": telefone,
                "numDocumento": numDocumento,
                "tipoPessoa": dados[i][2]
            };
            var duplicado = $filter("filter")(listaPessoas, {
                numDocumento: pessoa.numDocumento
            });
            if (duplicado.length == 0) {
                listaPessoas.push(pessoa);
            }
        }
        return listaPessoas;
    }

    vm.selecionarTodos = function () {
        vm.chek = !vm.chek;
        for (var i = 0; i < vm.dados.length; i++) {
            vm.onChangeBox(vm.dados[i])
        }
    }

    vm.onChangeBox = function (pessoa) {

        var endereco = new String(pessoa.nome + ", " + pessoa.logradouro + ", " + pessoa.quadraLote + ", " + pessoa.bairro + ", " + pessoa.estado + ", " + pessoa.cep);
        var pessoaExportacao = {
            "CPF/CNPJ": pessoa.numDocumento,
            "Endereco": endereco,
            "Telefone": pessoa.telefone.toString()
        }

        var index = vm.cardsPraExportacao.indexOf(pessoaExportacao);

        if (index == -1) {
            console.log("acrescentando pessoa na lista para exportação");
            vm.cardsPraExportacao.push(pessoaExportacao);
        } else {
            console.log("removendo pessoa na lista para exportação");
            vm.cardsPraExportacao.splice(index, 1)
        }
    };

});
