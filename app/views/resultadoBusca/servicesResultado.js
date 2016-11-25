// ============= SERVICE ENDERECO =============
servicos.factory('ResultadosSofiaService', function ($q, SofiaService, ResultadoService) {

    var ontologia = "ec_eck_ontologia";
    var ontologiaFavorito = "ec_eck_favoritos";


    var listarEndereco = function () {
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

        var query = "{'ec_eck_favoritos':{'numDocumento':'" + numDocumento + "', 'ecFavorito':" + ecFavorito + ", 'telFavorito':''}}";
        SofiaService.criar(query, ontologiaFavorito).then(
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

    var atualizarFavorito = function (numDocumento, idEc) {
        var q = $q.defer();
        var query = "{update ec_eck_favoritos " +
            " set ec_eck_favoritos.ecFavorito = " + idEc +
            " where ec_eck_favoritos.numDocumento = '" + numDocumento + "'}";
        SofiaService.atualizar(null, query, ontologiaFavorito).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;
    };

    var verificarExistePessoaCadastrada = function (numDocumento) {
        var q = $q.defer();
        var query = "SELECT ec_eck_favoritos.numDocumento from ec_eck_favoritos where ec_eck_favoritos.numDocumento = '" + numDocumento + "'";
        SofiaService.like(query, ontologiaFavorito).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;
    };

    var atualizarTelFavorito = function (numDocumento, telFavorito) {
        var q = $q.defer();
        var query = "{update ec_eck_favoritos " +
            " set ec_eck_favoritos.telFavorito = '" + telFavorito + "'"+
            " where ec_eck_favoritos.numDocumento = '" + numDocumento + "'}";
        SofiaService.atualizar(null, query, ontologiaFavorito).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;
    };

    var addTelFavorito = function (numDocumento, telFavorito) {
        var q = $q.defer();

        var query = "{'ec_eck_favoritos':{'numDocumento':'" + numDocumento + "', 'telFavorito':'" + telFavorito + "', 'ecFavorito':0}}";
        SofiaService.criar(query, ontologiaFavorito).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;

    };

    return {
        listarResultados: listarEndereco,
        addECFavorito: addECFavorito,
        addTelFavorito: addTelFavorito,
        buscaFavorito: buscaFavorito,
        atualizarFavorito: atualizarFavorito,
        atualizarTelFavorito: atualizarTelFavorito,
        verificarExistePessoaCadastrada:verificarExistePessoaCadastrada
    }
});
