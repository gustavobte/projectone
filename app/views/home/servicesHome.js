
// ============= SERVICE ENDERECO =============
servicos.factory('HomeSofiaService', function($q, SofiaService){

  var ontologiaBottomCidades = "ec_eck_bottom_10_media_municipal";
  var ontologiaTopCidades = "ec_eck_top_10_media_municipal";
  var ontologiaMedia = "ec_eck_media_origem_dados";
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
    var mediaOrigem = function(){
        var q = $q.defer();
        var query = "SELECT * FROM "+ontologiaMedia+" " ;
        console.log("Query Busca: " + query);
        SofiaService.listar(query,ontologia).then(
            function(dados){q.resolve(dados);},
            function(dados){q.reject(dados);});
        return q.promise;

    };
    var topCidades = function(){
        var q = $q.defer();
        var query = "SELECT * FROM "+ontologiaTopCidades+" " ;
        console.log("Query Busca: " + query);
        SofiaService.listar(query,ontologia).then(
            function(dados){q.resolve(dados);},
            function(dados){q.reject(dados);});
        return q.promise;

    };
    var bottomCidades = function(){
        var q = $q.defer();
        var query = "SELECT * FROM "+ontologiaBottomCidades+" " ;
        console.log("Query Busca: " + query);
        SofiaService.listar(query,ontologia).then(
            function(dados){q.resolve(dados);},
            function(dados){q.reject(dados);});
        return q.promise;

    };


  return {
      contarEnderecosProcessados : contarEnderecosProcessados,
      contarEnderecosEstruturados :contarEnderecosEstruturados,
      contarEnderecosNaoEstruturados: contarEnderecosNaoEstruturados,
      mediaOrigem:mediaOrigem,
      topCidades:topCidades,
      bottomCidades:bottomCidades

  }
});
