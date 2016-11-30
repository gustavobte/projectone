var filters = angular.module('myApp.filters', []);

filters.filter('joinBy', function () {
        return function (input,delimiter) {
            return (input || []).join(delimiter || ',');
        };
    });

filters.filter('formataCPFCNPJ', function() {
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

filters.filter('formataTelefone', function() {
    return function(item) {
        if (item != undefined) {
            return item.replace(/^(\d{2})(\d)/g, "($1) $2").replace(/(\d)(\d{4})$/, "$1-$2");
        }
    }
});
