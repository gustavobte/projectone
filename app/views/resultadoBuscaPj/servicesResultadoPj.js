
// ============= SERVICE ENDERECO =============
servicos.factory('ResultadosPjSofiaService', function($q, SofiaService, ResultadoServicePj){

  var tabela = "ec_eck_ontologia";
  var ontologia = "ec_eck_ontologia";


  var listarResultados = function(){
    var q = $q.defer();
      var query = "SELECT * FROM "+ontologia+" WHERE tipo_pesso = 'J' AND ec_numdocumento ='"+ResultadoService.getPessoa()+"'"  ;
      console.log("Query Busca: " + query);
    SofiaService.listar(query,ontologia).then(
      function(dados){q.resolve(dados);},
      function(dados){q.reject(dados);});
    return q.promise;
  };



    var atualizarEndereco = function(endereco){
        var q = $q.defer();
        var query = "{'endereco.id':"+endereco.id+"}";
        console.log(endereco.favorito);
        var data = "{'endereco':{'id':"+endereco.id+",'idpessoa':"+endereco.idpessoa+",'logradouro':'"+endereco.logradouro+"','complemento':'"+endereco.complemento+"','numero':"+endereco.numero+",'bairro':'"+endereco.bairro+"','cep':'"+endereco.cep+"','cidade':'"+endereco.cidade+"','estado':'"+endereco.estado+"','favorito':"+endereco.favorito+"}}";
        SofiaService.atualizar(data, query, ontologia).then(
            function(dados){q.resolve(dados);},
            function(dados){q.reject(dados);});
        return q.promise;
    };

    // var listarEnderecoPessoaNome= function(nomePessoa) {
    //     var q = $q.defer();
    //
    //     var query = "SELECT * FROM "+ontologia+" WHERE nome_pessoa LIKE '"+nomePessoa+"%'"  ;
    //     console.log("Query Nome: " + query);
    //     SofiaService.listar(query,ontologia).then(
    //         function(dados){
    //             q.resolve(dados);},
    //         function(dados){q.reject(dados);});
    //     return q.promise;
    //
    // };

  return {
      listarResultadosPj : listarResultadosPj,
      listarResultadoId : listarResultadoId
    //  listarEnderecoNome : listarEnderecoPessoaNome,
    // criarEndereco : criarEndereco,
    // favoritarEndereco : favoritarEndereco,
    // removerEnderecoId : removerEnderecoId,
    // removerEnderecoPessoaId : removerEnderecoPessoaId
  }
});
