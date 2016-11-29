// ============= SERVICE ENDERECO =============
servicos.factory('LoteSofiaService', function($q, SofiaService) {
    var ontologia = "ec_eck_max_mfinal_by_numdocumento";

    var listarEcByListaCPF = function(cpfs) {
        var q = $q.defer();

        var query = "SELECT * FROM " + ontologia + " WHERE " + ontologia + ".ec_numdocumento"
        var queryFilter = query.concat(cpfs.length == 1 ? " = " + cpfs + " " : " IN (" + cpfs + ")")

        SofiaService.listar(queryFilter, ontologia).then(

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

servicos.directive('onReadFile', function($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {
                            $fileContent: onLoadEvent.target.result
                        });
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});

servicos.filter('formataCPFCNPJ', function() {
    return function(item) {
        if (item != undefined) {
            if (item.length == 11) {
                return item.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
            } else {
                return item.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
            }
        }
    }
});

servicos.filter('formataTelefone', function() {
    return function(item) {
        if (item != undefined) {
            return item.replace(/^(\d{2})(\d)/g,"($1) $2").replace(/(\d)(\d{4})$/,"$1-$2");
        }
    }
});
