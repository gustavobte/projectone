// ============= SERVICE ENDERECO =============
servicos.factory('EnderecosSofiaService', function ($q, SofiaService) {

    var ontologia = "ec_eck_ontologia";

    var listarEnderecoPessoaId = function (idPessoa) {
        var q = $q.defer();

        var query = "SELECT ec_id, ec_numdocumento, nome_pessoa, dt_nascimento FROM " + ontologia + " WHERE ec_numdocumento ='000" + idPessoa + "' AND ec_tipoPessoa = 'F' limit 1";
        SofiaService.listar(query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;

    };

    var listarEnderecoPessoaNome = function (nomePessoa) {
        var q = $q.defer();

        var query = "SELECT max(ec_id), max(ec_numdocumento), max(nome_pessoa), max(dt_nascimento)" +
            " FROM " + ontologia + " " +
            " WHERE ec_nomepessoa LIKE '" + nomePessoa.toUpperCase() + "%'" +
            " AND ec_tipoPessoa = 'F' " +
            " group by ec_numdocumento";
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
        listarEndereco: listarEnderecoPessoaId,
        listarEnderecoNome: listarEnderecoPessoaNome
    }
});
