var servicos = angular.module('myApp.services', []);

// ============= MODEL PESSOA =============
servicos.factory('ResultadoService', function(){
  var pessoa = '';
  var getPessoa = function(){
    return pessoa;
  };
  var setPessoa = function(pes){
    pessoa = pes;
  };

  return {
    setPessoa : setPessoa,
    getPessoa : getPessoa
  };
});

// ============= MODEL ENDERECO =============
servicos.factory('ResultadoServicePj', function(){
  var pessoa = '';
  var getPessoa = function(){
    return pessoa;
  };
  var setPessoa = function(pes){
    pessoa = pes;
  };

  return {
    setPessoa : setPessoa,
    getPessoa : getPessoa
  };
});






