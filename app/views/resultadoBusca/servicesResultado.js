// ============= SERVICE ENDERECO =============
servicos.factory('ResultadosSofiaService', function ($q, SofiaService, ResultadoService) {

    var ontologia = "ec_eck_ontologia";
    var ontologiaFavorito = "ec_eck_favoritos";


    var listarResultados = function () {
        var q = $q.defer();
        var query = "SELECT * FROM " + ontologia + " WHERE ec_tipopessoa = 'F' AND ec_numdocumento ='" + ResultadoService.getPessoa() + "'";
        console.log("Query Busca: " + query);
        SofiaService.listar(query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;
    };


    var listarResultadoId = function (idPessoa) {
        var q = $q.defer();

        var query = "SELECT * FROM " + ontologia + " WHERE ec_tipopessoa = 'F' AND ec_numdocumento ='" + ResultadoService.getPessoa() + "'";
        console.log("Query CPF: " + query);
        SofiaService.listar(query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;

    };

    var addECFavorito = function (numDocumento, ecFavorito) {
        var q = $q.defer();

        var query = "{'ec_eck_favoritos':{'numDocumento':'"+numDocumento+"', 'ecFavorito':"+ecFavorito+"}}";
        console.log("Query FAVORITO ADD: " + query);
        SofiaService.criar(query, ontologiaFavorito).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;

    };

    var listarFavorito = function () {
        var q = $q.defer();

        var query = "SELECT * FROM " + ontologiaFavorito;
        console.log("Query FAVORITO: " + query);
        SofiaService.like(query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;

    };

    var buscaFavorito = function (numDocumento) {
        var q = $q.defer();

        var query = "SELECT * FROM " + ontologiaFavorito + " where ec_eck_favoritos.numDocumento = '"+numDocumento+"'";
        SofiaService.like(query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;

    };

    var atualizarFavorito = function(numDocumento) {
        var q = $q.defer();
        var query = "UPDATE "+ontologiaFavorito+" SET ec_eck_favoritos.ecFavorito=0 WHERE ec_eck_favoritos.numDocumento = '"+numDocumento+"'";
        console.log("Atualizar via num documento: "+numDocumento);
        console.log(query);
        SofiaService.atualizar(query,ontologiaFavorito).then(
            function(dados){q.resolve(dados);},
            function(dados){q.reject(dados);});
        return q.promise;
    };


    return {
        listarResultados: listarResultados,
        listarResultadoId: listarResultadoId,
        addECFavorito: addECFavorito,
        listarFavorito: listarFavorito,
        buscaFavorito: buscaFavorito,
        atualizarFavorito: atualizarFavorito
    }
});
