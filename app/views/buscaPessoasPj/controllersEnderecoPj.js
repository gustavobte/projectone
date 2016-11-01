
//-----------ENDERECO SOFIA------------------------
controladores.controller('EndPjSofiaCtrl', function($rootScope, $location, $scope, EnderecosPjSofiaService, EnderecoService, ResultadoServicePj) {
    if(!$rootScope.loggedIn == false){

        var vm = this;
        vm.dadosId= '';
        vm.dadosNome= '';

        vm.setPessoa = function(ec_id){
            ResultadoServicePj.setPessoa(ec_id);
        };

        EnderecosPjSofiaService.listarEnderecos().then(

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

                EnderecosPjSofiaService.listarEndereco(idPessoa).then(

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
                EnderecosPjSofiaService.listarEnderecoNome(nomePessoa).then(

                    function(dados){
                        vm.dadosNome= '';
                        vm.dadosId= '';
                        vm.dadosNome =dados["values"];
                        $scope.loading = false;
                    },
                    function(){
                        $scope.loading = true;
                        console.log("Erro ao localizar Endereço");
                    });
            }
        }


    }else{
        console.log("Efetuar Login");
        Materialize.toast('Por Favor Efetuar Login!', 4000); // 4000 is the duration of the toast
        $location.path('/login');
    }



});



