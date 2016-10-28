
//-----------PESSOA SOFIA------------------------
controladores.controller('ResultSofiaCtrl', function($scope, ResultadosSofiaService, ResultadoService) {

    var vm = this;
    vm.dadosId= '';
    vm.dadosNome= '';



   $scope.pessoa = function (pes) {

       console.log(pes)
       debugger
    };



    ResultadosSofiaService.listarResultados().then(

        function(dados){$scope.enderecos = dados;
            var quantidade = $scope.quantidade;

            var listaDados;
            listaDados = dados;

            console.log(listaDados);
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