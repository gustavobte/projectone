
//-----------ENDERECO SOFIA------------------------
controladores.controller('HomeSofiaCtrl', function($scope, $rootScope, $location, HomeSofiaService) {
    if(!$rootScope.loggedIn == false){

        var vm = this;
        $scope.x = true
        $scope.y = true
        $scope.z = true

        HomeSofiaService.contarEnderecosProcessados().then(

            function(dados){

                vm.quantidadeProcesssado = dados["values"][0][0];
                $scope.x = false
            }
        );

        HomeSofiaService.contarEnderecosEstruturados().then(

            function(dados){

                vm.quantidadeEstruturado = dados["values"][0][0];
                $scope.y = false
            }
        );

        HomeSofiaService.contarEnderecosNaoEstruturados().then(

            function(dados){

                vm.quantidadeNaoEstruturado = dados["values"][0][0];
                $scope.z = false
            }
        );



    }else{
        console.log("Efetuar Login");
        Materialize.toast('Por Favor Efetuar Login!', 4000); // 4000 is the duration of the toast
        $location.path('/login');
    }



});



