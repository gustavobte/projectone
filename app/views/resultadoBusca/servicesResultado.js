
// ============= SERVICE ENDERECO =============
servicos.factory('ResultadosSofiaService', function($q, SofiaService){

  var tabela = "islgyn_dadoscadastrais";
  var ontologia = "islgyn_dadoscadastrais";


  var listarResultados = function(){
    var q = $q.defer();
    var query = "SELECT * FROM "+ontologia+" LIMIT 10" ;
      console.log("Query Busca: " + query);
    SofiaService.listar(query,ontologia).then(
      function(dados){q.resolve(dados);},
      function(dados){q.reject(dados);});
    return q.promise;
  };


  var listarResultadoId = function(idPessoa) {
    var q = $q.defer();

      var query = "SELECT * FROM "+ontologia+" WHERE numr_documento ='"+idPessoa+"'"  ;
      console.log("Query CPF: " + query);
     SofiaService.listar(query,ontologia).then(
       function(dados){
           q.resolve(dados);},
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
      listarResultados : listarResultados,
      listarResultadoId : listarResultadoId,
    //  listarEnderecoNome : listarEnderecoPessoaNome,
    // criarEndereco : criarEndereco,
    // atualizarEndereco : atualizarEndereco,
    // favoritarEndereco : favoritarEndereco,
    // removerEnderecoId : removerEnderecoId,
    // removerEnderecoPessoaId : removerEnderecoPessoaId
  }
});
