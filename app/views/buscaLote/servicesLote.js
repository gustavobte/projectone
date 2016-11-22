// ============= SERVICE ENDERECO =============
servicos.factory('EnderecosSofiaService', function ($q, SofiaService) {

    var ontologia = "ec_eck_ontologia_sofia2";

    var listarEcByListaCPF = function () {
      console.log("listarEcByListaCPF")

        var q = $q.defer();

        var query = "SELECT * FROM " + ontologia + " limit 1";
        console.log(query)

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
        listarEcByListaCPF: listarEcByListaCPF
    }
});
