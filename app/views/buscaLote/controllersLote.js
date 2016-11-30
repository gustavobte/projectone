//-----------ENDERECO SOFIA------------------------
controladores.controller('BuscaLoteCtrl', function ($rootScope, $location, $filter, $scope, LoteSofiaService) {

    $(document).ready(function () {
        $('select').material_select();
    });

    var vm = this;

    vm.documentosImportados = '';
    vm.delimiter = ',';
    vm.cardsPraExportacao = [];
    vm.chek = false;
    vm.tipoDocumento = '';

    $scope.carregarConteudo = function ($fileContent) {
        vm.documentosImportados = $fileContent;
    };

    vm.extrairNumeroDocumento = function (cpfs) {
        var cpfFiltrado = new RegExp("[^\\d\\" + vm.delimiter + "]", "g");
        return cpfs.replace(cpfFiltrado, "")
    };

    vm.limpaVars = function () {
        vm.resultado = [];
        vm.dados = {
            cpf: []
        };
    };

    vm.substituiLinhasPorDelimitador = function (dados, delimitador) {
        return dados.replace(/\n/g, delimitador);
    };

    vm.trataDocumentos = function (dados, tipo) {
        var cnpj = "00000000000000";
        var cpf = "00000000000000";

        var tipoDocumento = '';
        for (var i = 0; i < dados.length; i++) {
            tipoDocumento = tipo == "cnpj" ? cnpj : cpf;
            var documentoTratado = (tipoDocumento + dados[i]).slice(-tipoDocumento.length);
            vm.dados.cpf.push("'" + documentoTratado + "'");
        }
        return vm.dados.cpf;
    };

    vm.montaDocumentos = function (dados, delimiter) {
        var documentosDelimitados = vm.substituiLinhasPorDelimitador(dados, delimiter);
        var documentosExtraidos = vm.extrairNumeroDocumento(documentosDelimitados);
        return vm.trataDocumentos(documentosExtraidos.split(delimiter), vm.tipoDocumento);
    };

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

            telefone = dados[i][20] ? dados[i][20].split(" - ") : "-";

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
    };


    vm.onChangeBox = function (pessoa) {
        var endereco = new String(pessoa.nome + ", " + pessoa.logradouro + ", " + pessoa.quadraLote + ", " + pessoa.bairro + ", " + pessoa.estado + ", " + pessoa.cep);
        var pessoaExportacao = {
            "CPF/CNPJ": pessoa.numDocumento,
            "Endereco": endereco,
            "Telefone": pessoa.telefone.toString()
        };

        var index = vm.cardsPraExportacao.indexOf(pessoaExportacao);

        if (index == -1) {
            console.log("acrescentando pessoa na lista para exportação");
            vm.cardsPraExportacao.push(pessoaExportacao);
        } else {
            console.log("removendo pessoa na lista para exportação");
            vm.cardsPraExportacao.splice(index, 1)
        }
    };

    vm.agruparDocumentos = function (documentos) {
        var size = 5000;
        var documentosAgrupados = [];
        while (documentos.length > 0)
            documentosAgrupados.push(documentos.splice(0, size));
        return documentosAgrupados;

    };

    vm.listarEcByListaCPF = function () {
        $scope.loading = true;
        vm.limpaVars();

        var documentos = vm.montaDocumentos(vm.documentosImportados, vm.delimiter);
        var documentosAgrupados = vm.agruparDocumentos(documentos);

        for (var i = 0; i < documentosAgrupados.length; i++) {
            LoteSofiaService.listarEcByListaCPF(documentosAgrupados[i]).then(
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
                    vm.cardsPraExportacao = [];
                    for (i = 0; i < vm.resultado.length; i++) {
                        vm.onChangeBox(vm.resultado[i])
                    }
                }
            );
            if (i == documentosAgrupados.length -1) {
                $scope.loading = false;
            }
        }

    };
});