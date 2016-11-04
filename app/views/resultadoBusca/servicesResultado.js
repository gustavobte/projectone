// ============= SERVICE ENDERECO =============
servicos.factory('ResultadosSofiaService', function ($q, SofiaService, ResultadoService) {

    var ontologia = "ec_eck_ontologia";
    var ontologiaFavorito = "ec_eck_favorito";


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

    var addFavorito = function (ecId) {
        var q = $q.defer();

        var query = "{'ec_eck_favorito':{'ecId':"+ecId+"}}";
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


    return {
        listarResultados: listarResultados,
        listarResultadoId: listarResultadoId,
        addFavorito: addFavorito,
        listarFavorito: listarFavorito
    }
});
