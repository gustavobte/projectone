// ============= SERVICE ENDERECO =============
servicos.factory('ResultadosPjSofiaService', function ($q, SofiaService, ResultadoServicePj) {

    var ontologia = "ec_eck_ontologia";

    var listarResultadosPj = function () {
        var q = $q.defer();
        var query = "SELECT * FROM "
            + ontologia +
            " WHERE ec_tipopessoa = 'J' " +
            "AND ec_numdocumento ='" + ResultadoServicePj.getPessoa() + "'";

        SofiaService.listar(query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;
    };

    return {
        listarResultadosPj: listarResultadosPj
    }
});
