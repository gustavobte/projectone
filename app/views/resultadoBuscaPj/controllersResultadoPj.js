
//-----------PESSOA SOFIA------------------------
controladores.controller('ResultPjSofiaCtrl', function($scope, $location, $rootScope, ResultadosPjSofiaService, ResultadoService) {


        var vm = this;
        vm.dadosId= '';
        vm.dadosNome= '';


        ResultadosPjSofiaService.listarResultadosPj().then(
            function(dados){$scope.enderecos = dados;
                $scope.resultadoLoad = true;

                var quantidade = $scope.quantidade;

                console.log(dados);

                vm.listaDadosPj = '';
                vm.listaDadosPj = dados["values"];

                $scope.resultadoLoad = false;
                console.log(vm.listaDadosPj);

            }
        );




        $scope.listarResultadocpf= function(idPessoa) {
            $scope.loading = true;

            if (idPessoa !== null && idPessoa !== undefined && idPessoa !== '') {

                ResultadosPjSofiaService.listarResultadoIdPj(idPessoa).then(

                    function(dados){
                        vm.dadosId= '';
                        console.log(vm.dadosId);
                        vm.dadosId = JSON.parse(dados)["values"];
                        $scope.loading = false;
                    },
                    function(){
                        console.log("Erro ao localizar Endereço");
                    });
            }
        }



});