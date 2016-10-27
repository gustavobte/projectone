var servicos = angular.module('myApp.services', []);

// ============= MODEL PESSOA =============
servicos.factory('PessoaService', function(){
  var pessoa;
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
servicos.factory('EnderecoService', function(){
  var endereco;
  var getEndereco = function(){
    return endereco;
  };
  var setEndereco = function(end){
    endereco = end;
  };

  return {
    getEndereco : getEndereco,
    setEndereco : setEndereco
  };
});






