// ============= SERVICE ENDERECO =============
servicos.factory('LoteSofiaService', function($q, SofiaService) {
    var ontologia = "ec_eck_max_mfinal_by_numdocumento";

    var listarEcByListaCPF = function(cpfs) {
        var q = $q.defer();

        var query = "SELECT * FROM " + ontologia + " WHERE " + ontologia + ".ec_numdocumento"
        query = query.concat(cpfs.length == 1 ? " = " + cpfs + " " : " IN (" + cpfs + ")")

        SofiaService.listar(query, ontologia).then(

            function(dados) {
                q.resolve(dados);
            },
            function(dados) {
                q.reject(dados);
            });
        return q.promise;
    };
    return {
        listarEcByListaCPF: listarEcByListaCPF
    }
});