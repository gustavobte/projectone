//-----------ENDERECO SOFIA------------------------
controladores.controller('BuscaLoteCtrl', function($rootScope, $location, $filter, $scope, LoteSofiaService, ResultadoService) {

    $(document).ready(function() {
        $('select').material_select();
    });

    var vm = this;

    vm.cpf = '';
    vm.delimiter = ',';
    vm.cardsPraExportacao = [];
    vm.chek = false;
    vm.carregado = false;

    $scope.carregarConteudo = function($fileContent){
       vm.cpf = $fileContent;
       vm.carregado = "Carregado com sucesso";
   };

    $scope.submitTable = function() {
        console.log($scope.table);
    }

    vm.setPessoa = function(ec_id) {
        ResultadoService.setPessoa(ec_id);
    };

    vm.filtraCpfs = function(cpfs) {
        var cpfFiltrado = new RegExp("[^\\d\\"+vm.delimiter+"]", "g");
        return cpfs.replace(cpfFiltrado, "")
    };

    $scope.listarEcByListaCPF = function() {
        $scope.loading = true;

        vm.dados = {
            cpf: []
        };

        var cpfs = vm.cpf.replace(/\n/g, vm.delimiter)
        cpfs= vm.filtraCpfs(cpfs).split(vm.delimiter);

        for (var i = 0; i < cpfs.length; i++) {
            var zeros = cpfs[i].length == 11 ? '000' : ''
            vm.dados.cpf.push("'" + zeros + cpfs[i] + "'");
        }

        LoteSofiaService.listarEcByListaCPF(vm.dados.cpf).then(

            function(dados) {
                if (dados != "") {
                    vm.dados = vm.formataPessoa(JSON.parse(dados)["values"]);
                } else {
                    vm.dados = "";
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

          var numDocumento;

          if(dados[i][2]=="J"){
            numDocumento = dados[i][3]
          }else{
            numDocumento = dados[i][3].substring(3,14)
          }

            var pessoa = {
                "nome": dados[i][4],
                "logradouro": dados[i][5] + " " + dados[i][6],
                "quadraLote": dados[i][10],
                "bairro": dados[i][11],
                "estado": dados[i][13] + "-" + dados[i][14],
                "cep": dados[i][12],
                "telefone": dados[i][20],
                "numDocumento": numDocumento,
                "tipoPessoa": dados[i][2]
            };
            var duplicado = $filter("filter")(listaPessoas, {
                nome: pessoa.nome
            });
            if (duplicado.length == 0) {
                listaPessoas.push(pessoa);
            }

        }

        return listaPessoas;
    }

    vm.selecionarTodos = function() {
        vm.chek = !vm.chek;
        for (var i = 0; i < vm.dados.length; i++) {
            vm.onChangeBox(vm.dados[i])
        }
    }

    vm.removePropVazias = function(pessoa) {
        if (pessoa.nome == "") {
            delete pessoa.nome
        }
        if (pessoa.logradouro == "") {
            delete pessoa.logradouro
        }
        if (pessoa.quadraLote == "") {
            delete pessoa.quadraLote
        }
        if (pessoa.bairro == "") {
            delete pessoa.bairro
        }
        if (pessoa.estado == "") {
            delete pessoa.estado
        }
        if (pessoa.cep == "") {
            delete pessoa.cep
        }
        if (pessoa.telefone == "") {
            delete pessoa.telefone
        }
        if (pessoa.numDocumento == "") {
            delete pessoa.numDocumento
        }
        return pessoa;
    }

    vm.onChangeBox = function(pessoa) {

        var index = vm.cardsPraExportacao.indexOf(pessoa);

        if (index == -1) {
            console.log("acrescentando pessoa na lista para exportação");
            vm.cardsPraExportacao.push(vm.removePropVazias(pessoa));
        } else {
            console.log("removendo pessoa na lista para exportação");
            vm.cardsPraExportacao.splice(index, 1)
        }
    };

});
