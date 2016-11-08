// ============= SERVICE ENDERECO =============
servicos.factory('ResultadosSofiaService', function ($q, SofiaService, ResultadoService) {

    var ontologia = "ec_eck_ontologia";
    var ontologiaFavorito = "ec_eck_favoritos";


    var listarResultados = function () {
        var q = $q.defer();
        var query = "SELECT * FROM " + ontologia + " WHERE ec_tipopessoa = 'F' AND ec_numdocumento ='" + ResultadoService.getPessoa() + "'";
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

        var query = "{'ec_eck_favoritos':{'numDocumento':'" + numDocumento + "', 'ecFavorito':" + ecFavorito + "}}";
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

        var query = "SELECT * FROM " + ontologiaFavorito + " where ec_eck_favoritos.numDocumento = '" + numDocumento + "'";
        SofiaService.like(query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;

    };

    var atualizarFavorito = function (numDocumento) {
        console.log("Atualizando")
        var q = $q.defer();
        // var query = "update ec_eck_favoritos set ec_eck_favoritos.numDocumento = '1' where ec_eck_favoritos.numDocumento = '00003411720140'";

        var data = "{'ec_eck_favoritos.ecFavorito':100}";
        var query = "{'ec_eck_favoritos':{'ecFavorito':3729619}}";

        SofiaService.atualizar(data, query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;
    };

    var removeTodosFavoritos = function (numDocumento) {
        console.log("Removendo . . .")
        var q = $q.defer();

        var query = "{'ec_eck_favoritos':{'ecFavorito':1157352}}";

        SofiaService.remover(query, ontologiaFavorito).then(
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
        addECFavorito: addECFavorito,
        listarFavorito: listarFavorito,
        buscaFavorito: buscaFavorito,
        atualizarFavorito: atualizarFavorito,
        removeTodosFavoritos: removeTodosFavoritos
    }
});
