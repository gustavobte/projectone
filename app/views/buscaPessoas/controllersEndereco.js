
//-----------ENDERECO SOFIA------------------------
controladores.controller('EndSofiaCtrl', function($scope, EnderecosSofiaService, EnderecoService, ResultadoService) {

    var vm = this;
    vm.dadosId= '';
    vm.dadosNome= '';


  EnderecosSofiaService.listarEnderecos().then(

    function(dados){$scope.enderecos = dados;
        var quantidade = $scope.quantidade;

        var listaDados;
        listaDados = dados;

        console.log(listaDados);
    }
      );



    $scope.listarEndereco = function(idPessoa, nomePessoa) {
        $scope.loading = true;

        if(idPessoa == null || idPessoa == undefined || idPessoa == '' ||
            nomePessoa == null || nomePessoa == undefined || nomePessoa == ''){

        }

        if (idPessoa !== null && idPessoa !== undefined && idPessoa !== '') {

            EnderecosSofiaService.listarEndereco(idPessoa).then(

                function(dados){
                    vm.dadosId= '';
                    vm.dadosNome= '';

                    vm.dadosId = dados["values"];
                    $scope.loading = false;
                },
                function(){
                    console.log("Erro ao localizar Endereço");
                });

        }else if (nomePessoa !== null && nomePessoa !== undefined && nomePessoa !== ''){
            $scope.loading = true;
                EnderecosSofiaService.listarEnderecoNome(nomePessoa).then(

                    function(dados){
                        vm.dadosNome= '';
                        vm.dadosId= '';

                        vm.dadosNome =dados["values"];
                        $scope.loading = false;
                    },
                    function(){
                        console.log("Erro ao localizar Endereço");
                    });
            };
        }
});



