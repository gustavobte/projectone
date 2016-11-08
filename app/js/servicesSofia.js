// ============= SERVICE SOFIA =============
app.factory('SofiaService', function ($q, $rootScope) {
    $rootScope.logado = true;
    var token = "abde472c4c674f89a934941da604c9c3";
    var instancePK = "indragyn:sefaz";

    // var token = "abde472c4c674f89a934941da604c9c3";
    // var instancePK = "indragyn:sefaz";


    var sessionKey;

    var conectado = function () {
        var q = $q.defer();
        if ($rootScope.conexao != null) {
            sessionKey = $rootScope.conexao.sessionKey;
            q.resolve(sessionKey);
        } else {
            conectar().then(
                function () {
                    sessionKey = $rootScope.conexao.sessionKey;
                    q.resolve(sessionKey);
                },
                function () {
                    q.reject(sessionKey);
                }
            );
        }
        return q.promise;
    };

    var conectar = function () {

        var q = $q.defer();
        var conexao = [];

        sofia2.joinToken(token, instancePK, function (mensajeSSAP) {
            if (mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true) {
                conexao = {"status": "Conectado!", "sessionKey": mensajeSSAP.sessionKey};
                $rootScope.conexao = conexao;
                q.resolve(conexao);
            } else {
                conexao = {"status": "Falha na Conexão!"};
                $rootScope.conexao = conexao;
                q.reject(conexao);
            }
        });
        return q.promise;
    };

    var listarQuery = function (query, ontologia) {
        sofia2.sessionKey = sessionKey;
        var q = $q.defer();
        var dados = [];
        conectado().then(function () {
            sofia2.queryWithQueryType(query, ontologia, "BDH", null, function (mensajeSSAP) {
                if (mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true) {
                    dados = mensajeSSAP.body.data;
                    q.resolve(dados);
                } else {
                    dados = {"status": "Erro ao Listar Pessoa!"};
                    q.reject(dados);
                }
            });
        }, function () {
            q.reject(dados);
        });
        return q.promise;
    };

    var atualizar = function (data, query, ontologia) {
        var q = $q.defer();
        var dados = [];
        conectado().then(
            function () {
                sofia2.update(data, query, ontologia, function (mensajeSSAP) {
                    debugger
                    // sofia2.updateWithQueryType(data, query, ontologia,"SQLLIKE" ,function(mensajeSSAP){
                    if (mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true) {
                        dados = {"status": "Objeto Criada com Sucesso!", "data": mensajeSSAP.body.data};
                        q.resolve(dados);
                    } else {
                        dados = {"status": "Erro ao criar Objeto!"};
                        q.reject(dados);
                    }
                }, sessionKey);
            },
            function () {
                q.reject(dados);
            });
        return q.promise;
    };

    var criarQuery = function (query, ontologia) {
        var q = $q.defer();
        var dados = [];
        conectado().then(
            function () {
                sofia2.insert(query, ontologia, function (mensajeSSAP) {
                    if (mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true) {
                        dados = {"status": "Objeto Criada com Sucesso!", "data": mensajeSSAP.body.data};
                        q.resolve(dados);
                    } else {
                        dados = {"status": "Erro ao criar Objeto!"};
                        q.reject(dados);
                    }
                }, sessionKey);
            },
            function () {
                q.reject(dados);
            });
        return q.promise;
    };

    var remover = function (query, ontologia) {
        var q = $q.defer();
        var dados = [];
        conectado().then(
            function () {
                sofia2.remove(query, ontologia,
                    function (mensajeSSAP) {
                        if (mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true) {
                            dados = {"status": "Objeto Removido com Sucesso!", "data": mensajeSSAP.body.data};
                            q.resolve(dados);
                        } else {
                            debugger;
                            dados = {"status": "Erro ao criar Objeto!"};
                            q.reject(dados);
                        }
                    }, sessionKey);
            },
            function () {
                q.reject(dados);
            });
        return q.promise;
    };


    var listarQueryLike = function (query, ontologia) {

        var q = $q.defer();
        var dados = [];
        sofia2.sessionKey = sessionKey;

        conectado().then(function () {
            sofia2.queryWithQueryType(query, ontologia, "SQLLIKE", null, function (mensajeSSAP) {
                if (mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true) {
                    dados = mensajeSSAP.body.data;
                    q.resolve(dados);
                } else {
                    dados = {"status": "Erro ao Listar favoritos!"};
                    q.reject(dados);
                }
            });
        }, function () {
            q.reject(dados);
        });
        return q.promise;
    };


    return {
        conectar: conectar,
        listar: listarQuery,
        atualizar: atualizar,
        criar: criarQuery,
        remover: remover,
        like: listarQueryLike
    }
});
