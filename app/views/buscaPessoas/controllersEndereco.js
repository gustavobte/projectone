//-----------ENDERECO SOFIA------------------------
controladores.controller('EndSofiaCtrl', function ($rootScope, $location, $scope, EnderecosSofiaService, ResultadoService) {


    var vm = this;
    vm.dadosId = '';
    vm.dadosNome = '';

    vm.setPessoa = function (ec_id) {
        ResultadoService.setPessoa(ec_id);
    };

    $scope.listarEndereco = function (idPessoa, nomePessoa) {
        $scope.loading = true;

        if (idPessoa == null || idPessoa == undefined || idPessoa == '' ||
            nomePessoa == null || nomePessoa == undefined || nomePessoa == '') {
        }


        if (idPessoa !== null && idPessoa !== undefined && idPessoa !== '') {

            EnderecosSofiaService.listarEndereco(idPessoa).then(
                function (dados) {
                    vm.dadosId = '';
                    vm.dadosNome = '';

                    vm.dadosId = JSON.parse(dados)["values"];
                    $scope.loading = false;
                },
                function () {
                    console.log("Erro ao localizar Endereço");
                });

        } else if (nomePessoa !== null && nomePessoa !== undefined && nomePessoa !== '') {
            $scope.loading = true;
            EnderecosSofiaService.listarEnderecoNome(nomePessoa).then(
                //Converter json pra object
                function (dados) {
                    console.log(dados);
                    vm.dadosNome = '';
                    vm.dadosId = '';
                    vm.dadosNome = JSON.parse(dados)["values"];
                    $scope.loading = false;
                },
                function () {

                    console.log("Erro ao localizar Endereço");
                });
        }
    }


});



