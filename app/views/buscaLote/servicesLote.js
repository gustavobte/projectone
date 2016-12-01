// ============= SERVICE ENDERECO =============
servicos.factory('LoteSofiaService', function ($q, SofiaService) {
    var ontologia = "ec_eck_max_mfinal_by_numdocumento";

    var listarEcByListaDocumentos = function (documentos, tipoPessoa) {
        return $q.all(documentos.map(function (item) {
            var query = "SELECT * FROM " + ontologia + " WHERE " + ontologia + ".ec_numdocumento IN (" + item + ")";
            query = query.concat(" AND " + ontologia + ".ec_tipopessoa = " + tipoPessoa);
            var q = $q.defer();

            SofiaService.listar(query, ontologia).then(
                function (dados) {
                    q.resolve(dados);
                },
                function (dados) {
                    q.reject(dados);
                });
            return q.promise;
        })).then(function (results) {
            return results;
        });
    };

    var listarEc = function (documentos, tipoDocumento) {
        var tipoPessoa = tipoDocumento == "cpf" ? "'F'" : "'J'";
        return listarEcByListaDocumentos(documentos, tipoPessoa);
    };
    return {
        listarEcByListaDocumentos: listarEcByListaDocumentos,
        listarEc: listarEc
    }
});