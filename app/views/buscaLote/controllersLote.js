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

    vm.carregarConteudo = function ($fileContent) {
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
        vm.loading = false;
        vm.documentosImportados = "";
        vm.tipoDocumento = "";
        vm.finalizouConsulta = false;
    };

    vm.substituiLinhasPorDelimitador = function (dados, delimitador) {
        return dados.replace(/\n/g, delimitador);
    };

    vm.trataDocumentos = function (dados) {
        var base = "00000000000000";

        for (var i = 0; i < dados.length; i++) {
            var documentoTratado = (base + dados[i]).slice(-base.length);
            vm.dados.cpf.push("'" + documentoTratado + "'");
        }
        return vm.dados.cpf;
    };

    vm.montaDocumentos = function (dados, delimiter) {
        var documentosDelimitados = vm.substituiLinhasPorDelimitador(dados, delimiter);
        var documentosExtraidos = vm.extrairNumeroDocumento(documentosDelimitados);
        return vm.trataDocumentos(documentosExtraidos.split(delimiter));
    };

    vm.formataPessoa = function (dados) {
        var listaPessoas = [];
        for (var j = 0; j < dados.length; j++) {
            if (dados[j].length > 0) {
                try {
                    // var regex = new RegExp('\\', 'g');
                    //var regex2 = new RegExp('\\\\\"', 'g');
                    var elementosReplace = dados[j].replace(/\\/g, '\\\\').replace(/\\\\\"/g, '\\\"');
                    var elemento = JSON.parse(elementosReplace)["values"];

                } catch (error) {
                    alert("Aconteceu um erro na formataçao dos dados. Comunique com o departamento de TI.")

                }

                for (var i = 0; i < elemento.length; i++) {

                    var numDocumento;
                    var telefone;

                    if (elemento[i][2] == "J") {
                        numDocumento = elemento[i][3]
                    } else {
                        numDocumento = elemento[i][3].substring(3, 14)
                    }

                    telefone = elemento[i][20] ? elemento[i][20].split(" - ") : "-";

                    var pessoa = {
                        "nome": elemento[i][19],
                        "tipologradouro": elemento[i][5],
                        "logradouro": elemento[i][6],
                        "numero": elemento[i][7],
                        "quadra": elemento[i][8],
                        "lote": elemento[i][9],
                        "quadraLote": elemento[i][10],
                        "bairro": elemento[i][11],
                        "municipio": elemento[i][13] ,
                        "estado": elemento[i][14],
                        "cep": elemento[i][12],
                        "telefone": telefone,
                        "numDocumento": numDocumento,
                        "tipoPessoa": elemento[i][2]
                    };

                    var duplicado = $filter("filter")(listaPessoas, {
                        numDocumento: pessoa.numDocumento
                    });

                    if (duplicado.length == 0) {
                        listaPessoas.push(pessoa);
                    }
                }
            }
        }
        return listaPessoas;
    };


    vm.onChangeBox = function (pessoa) {
        var endereco = new String(pessoa.nome + ", " + pessoa.logradouro + ", " + pessoa.quadraLote + ", " + pessoa.bairro + ", " + pessoa.estado + ", " + pessoa.cep);
        var pessoaExportacao = {
            "CPF/CNPJ": pessoa.numDocumento,
            "Nome": pessoa.nome,
            "TipoLogradouro": pessoa.tipologradouro,
            "Logradouro": pessoa.logradouro,
            "Numero": pessoa.numero,
            "Quadra": pessoa.quadra,
            "Lote": pessoa.lote,
            "Complemento": pessoa.quadraLote,
            "Bairro": pessoa.bairro,
            "Municipio": pessoa.municipio,
            "UF": pessoa.estado,
            "CEP": pessoa.cep,
            "Telefone": pessoa.telefone.toString()

        };

        var index = vm.cardsPraExportacao.indexOf(pessoaExportacao);

        if (index == -1) {
            vm.cardsPraExportacao.push(pessoaExportacao);
        } else {
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
        vm.finalizouConsulta = false;
        vm.loading = true;
        vm.cardsPraExportacao = [];
        vm.resultado = [];

        var documentos = vm.montaDocumentos(vm.documentosImportados, vm.delimiter);
        var documentosAgrupados = vm.agruparDocumentos(documentos);

        LoteSofiaService.listarEc(documentosAgrupados, vm.tipoDocumento).then(
            function (dados) {
                if (dados != "") {
                    vm.resultado = vm.resultado.concat(vm.formataPessoa(dados));
                } else {
                    vm.resultado = [];
                }
                vm.cardsPraExportacao = [];
                for (var i = 0; i < vm.resultado.length; i++) {
                    vm.onChangeBox(vm.resultado[i])
                }

                vm.finalizouConsulta = true;
                vm.loading = false;
            },
            function () {
                console.log("Erro ao localizar pessoa");
                vm.finalizouConsulta = true;
                vm.loading = false;
            });
    };
});