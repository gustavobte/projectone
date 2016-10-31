
//-----------PESSOA SOFIA------------------------
controladores.controller('ResultSofiaCtrl', function($scope, ResultadosSofiaService, ResultadoService) {

    var vm = this;
    vm.dadosId= '';
    vm.dadosNome= '';


    ResultadosSofiaService.listarResultados().then(
        function(dados){$scope.enderecos = dados;
            $scope.resultadoLoad = true;

            var quantidade = $scope.quantidade;

            console.log(dados);

            vm.listaDados = '';
            vm.listaDados = dados["values"];

            $scope.resultadoLoad = false;

            console.log(vm.listaDados);
            debugger;
        }
    );




    $scope.listarResultadocpf= function(idPessoa) {
        $scope.loading = true;

        if (idPessoa !== null && idPessoa !== undefined && idPessoa !== '') {

            ResultadosSofiaService.listarResultadoId(idPessoa).then(

                function(dados){
                    vm.dadosId= '';
                    console.log(vm.dadosId);
                    vm.dadosId = dados["values"];
                    $scope.loading = false;
                },
                function(){
                    console.log("Erro ao localizar Endereço");
                });
        }
    }



});