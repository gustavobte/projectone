// ============= SERVICE ENDERECO =============
servicos.factory('EnderecosSofiaService', function($q, SofiaService) {

    var ontologia = "ec_eck_ontologia_sofia2";

    var listarEcByListaCPF = function(cpfs) {
        var q = $q.defer();

        var query = "SELECT * FROM " + ontologia + " WHERE ec_eck_ontologia_sofia2.ec_numdocumento IN (" + cpfs + ")";
        console.log(query)

        SofiaService.like(query, ontologia).then(
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
