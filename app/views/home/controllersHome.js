
//-----------ENDERECO SOFIA------------------------
controladores.controller('HomeSofiaCtrl', function($scope, $rootScope, $location, HomeSofiaService) {


        var vm = this;
        $scope.x = true
        $scope.y = true
        $scope.z = true

        HomeSofiaService.contarEnderecosProcessados().then(

            function(dados){
                vm.quantidadeProcesssado = JSON.parse(dados)["values"][0][0];
                $scope.x = false

            }
        );

        HomeSofiaService.contarEnderecosEstruturados().then(

            function(dados){

                vm.quantidadeEstruturado = JSON.parse(dados)["values"][0][0];
                $scope.y = false
            }
        );

        HomeSofiaService.contarEnderecosNaoEstruturados().then(

            function(dados){

                vm.quantidadeNaoEstruturado = JSON.parse(dados)["values"][0][0];
                $scope.z = false
            }
        );



});



