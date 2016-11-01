
// ============= SERVICE ENDERECO =============
servicos.factory('HomeSofiaService', function($q, SofiaService){

  var tabela = "ec_eck_join";
  var ontologia = "ec_eck_join";


  var contarEnderecosProcessados = function(){
    var q = $q.defer();
    var query = "SELECT count(*) FROM "+ontologia+" " ;
      console.log("Query Busca: " + query);
    SofiaService.listar(query,ontologia).then(
      function(dados){q.resolve(dados);},
      function(dados){q.reject(dados);});
    return q.promise;

  };
    var contarEnderecosEstruturados = function(){
        var q = $q.defer();
        var query = "SELECT count(*) FROM "+ontologia+" WHERE eck_tipoend = 'E'" ;
        console.log("Query Busca: " + query);
        SofiaService.listar(query,ontologia).then(
            function(dados){q.resolve(dados);},
            function(dados){q.reject(dados);});
        return q.promise;

    };

    var contarEnderecosNaoEstruturados = function(){
        var q = $q.defer();
        var query = "SELECT count(*) FROM "+ontologia+" WHERE eck_tipoend = 'N'" ;
        console.log("Query Busca: " + query);
        SofiaService.listar(query,ontologia).then(
            function(dados){q.resolve(dados);},
            function(dados){q.reject(dados);});
        return q.promise;

    };


  return {
      contarEnderecosProcessados : contarEnderecosProcessados,
      contarEnderecosEstruturados :contarEnderecosEstruturados,
      contarEnderecosNaoEstruturados: contarEnderecosNaoEstruturados

  }
});
