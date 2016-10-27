
//-----------ENDERECO SOFIA------------------------
controladores.controller('EndSofiaCtrl', function($scope, EnderecosSofiaService, EnderecoService) {

    var vm = this;
    vm.dadosId= '';
    vm.dadosNome= '';


  EnderecosSofiaService.listarEnderecos().then(

    function(dados){$scope.enderecos = dados;
        var quantidade = $scope.quantidade;

        var dprod2;
        dprod2 = dados;

        console.log(dprod2);
       // eval("var dprod="+ dados + ";");
        //debugger;
        //console.log("Teste " + dprod["values"][2][2]);

        var tbl ="<table border='\"1\"'>";
        tbl += "<tr><td>TPO Pessoa</td><td>CPF</td><td>Nome</td><td>Sexo</td><td>Dt Nascimento</td><td>Mae</td><td>Tel Sefaz</td><td>Tel Ref</td></td></tr>";

        for(var i=0; i< dprod2["values"].length; i++){
            tbl += "<tr>";
                for(var j=0; j<dprod2["columns"].length; j++ ){
                    tbl+= "<td>" + dprod2["values"][i][j] + "</td>";
                }

            tbl += "</tr>";
        }
        tbl += "</table>";
        document.getElementById('tabela').innerHTML = tbl;
    }
      );


    $scope.listarEndereco = function(idPessoa, nomePessoa) {

        if (idPessoa !== null && idPessoa !== undefined && idPessoa !== '') {

            EnderecosSofiaService.listarEndereco(idPessoa).then(

                function(dados){
                    vm.dadosId= '';
                    vm.dadosNome= '';
                    vm.dadosId = dados["values"];

                },
                function(){
                    console.log("Erro ao localizar Endereço");
                });

        }else if (nomePessoa !== null && nomePessoa !== undefined && nomePessoa !== ''){

                EnderecosSofiaService.listarEnderecoNome(nomePessoa).then(

                    function(dados){
                        vm.dadosNome= '';
                        vm.dadosId= '';
                        vm.dadosNome =dados["values"];

                    },
                    function(){
                        console.log("Erro ao localizar Endereço");
                    });
            };
        }
});



