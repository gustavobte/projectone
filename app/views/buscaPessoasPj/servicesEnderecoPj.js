// ============= SERVICE ENDERECO =============
servicos.factory('EnderecosPjSofiaService', function ($q, SofiaService) {

    var ontologia = "ec_eck_ontologia";


    var listarEnderecos = function () {
        var q = $q.defer();
        var query = "SELECT * FROM " + ontologia + " LIMIT 10";
        SofiaService.listar(query, ontologia).then(
            function (dados) {
                q.resolve(dados);
            },
            function (dados) {
                q.reject(dados);
            });
        return q.promise;
    };


    var listarEnderecoPessoaId = function (idPessoa) {
        var q = $q.defer();

        var query = "SELECT ec_id, ec_numdocumento, ec_nomepessoa, dt_nascimento FROM " + ontologia + " WHERE ec_tipopessoa ='J' AND ec_numdocumento ='" + idPessoa + "' limit 1";
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

        var query = "SELECT max(ec_id), max(ec_numdocumento), max(ec_nomepessoa), max(dt_nascimento)" +
            " FROM " + ontologia + " " +
            " WHERE ec_tipopessoa ='J' AND ec_nomepessoa LIKE '" + nomePessoa.toUpperCase() + "%'" +
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
        listarEnderecos: listarEnderecos,
        listarEndereco: listarEnderecoPessoaId,
        listarEnderecoNome: listarEnderecoPessoaNome
    }
});
