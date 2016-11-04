//-----------PESSOA SOFIA------------------------
controladores.controller('ResultSofiaCtrl', function ($scope, $location, $rootScope, ResultadosSofiaService, ResultadoService) {

    var vm = this;
    vm.dadosId = '';
    vm.dadosNome = '';
    vm.favorito = false;

    ResultadosSofiaService.listarResultados().then(
        function (dados) {
            $scope.enderecos = JSON.parse(dados);
            $scope.resultadoLoad = true;
            vm.listaDados = '';
            vm.listaDados = JSON.parse(dados)["values"];
            $scope.resultadoLoad = false;
        }
    );

    $scope.listarFavorito = function () {

        ResultadosSofiaService.listarFavorito().then(
            function (dados) {
                console.log(dados);
            },
            function () {
                console.log("Erro ao localizar favorito");
            });
    };


    $scope.onChange = function (ecId) {
        ResultadosSofiaService.addFavorito(ecId).then(
            function (dados) {
                console.log(dados)
            },
            function (dados) {
                console.log(dados);
            });

    }

});