
// ============= SERVICE ENDERECO =============
servicos.factory('EnderecosSofiaService', function($q, SofiaService){

  var tabela = "islgyn_dadoscadastrais";
  var ontologia = "islgyn_dadoscadastrais";


  var listarEnderecos = function(){
    var q = $q.defer();
    var query = "SELECT * FROM "+ontologia+"" ;
      console.log("Query Busca: " + query);
    SofiaService.listar(query,ontologia).then(
      function(dados){q.resolve(dados);},
      function(dados){q.reject(dados);});
    return q.promise;
  };


  var listarEnderecoPessoaId = function(idPessoa) {
    var q = $q.defer();

      var query = "SELECT * FROM "+ontologia+" WHERE numr_documento ='"+idPessoa+"'"  ;
      console.log("Query CPF: " + query);
     SofiaService.listar(query,ontologia).then(
       function(dados){
           q.resolve(dados);},
       function(dados){q.reject(dados);});
   return q.promise;

 };

    var listarEnderecoPessoaNome= function(nomePessoa) {
        var q = $q.defer();

        var query = "SELECT * FROM "+ontologia+" WHERE nome_pessoa LIKE '"+nomePessoa+"%'"  ;
        console.log("Query Nome: " + query);
        SofiaService.listar(query,ontologia).then(
            function(dados){
                q.resolve(dados);},
            function(dados){q.reject(dados);});
        return q.promise;

    };

  return {
    listarEnderecos : listarEnderecos,
     listarEndereco : listarEnderecoPessoaId,
      listarEnderecoNome : listarEnderecoPessoaNome,
    // criarEndereco : criarEndereco,
    // atualizarEndereco : atualizarEndereco,
    // favoritarEndereco : favoritarEndereco,
    // removerEnderecoId : removerEnderecoId,
    // removerEnderecoPessoaId : removerEnderecoPessoaId
  }
});
