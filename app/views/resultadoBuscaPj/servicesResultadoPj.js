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


    var listarResultadoIdPj = function (endereco) {
        var q = $q.defer();
        var query = "{'endereco.id':" + endereco.id + "}";
        var data = "{'endereco':{'id':" + endereco.id + ",'idpessoa':" + endereco.idpessoa + ",'logradouro':'" + endereco.logradouro + "','complemento':'" + endereco.complemento + "','numero':" + endereco.numero + ",'bairro':'" + endereco.bairro + "','cep':'" + endereco.cep + "','cidade':'" + endereco.cidade + "','estado':'" + endereco.estado + "','favorito':" + endereco.favorito + "}}";
        SofiaService.atualizar(data, query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;
    };
    return {
        listarResultadosPj: listarResultadosPj,
        listarResultadoIdPj: listarResultadoIdPj
    }
});
