  $(document).ready(function () {

    $.getJSON('estados_cidades.json', function (data) {

      var items = [];
      var options = '<option value="">escolha um estado</option>';

      $.each(data, function (key, val) {
        options += '<option value="' + val.nome + '">' + val.nome + '</option>';
      });
      $("#estados").html(options);

      $("#estados").change(function () {

        var options_cidades = '';
        var str = "";

        $("#estados option:selected").each(function () {
          str += $(this).text();
        });

        $.each(data, function (key, val) {
          if(val.nome == str) {
            $.each(val.cidades, function (key_city, val_city) {
              options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
            });
          }
        });

        $("#cidades").html(options_cidades);

      }).change();

    });

  });



      jQuery(function($){
         $("#cpf").mask("999.999.999-99",{placeholder:"0"});
         $("#telefone").mask("(999) 99999-9999",{placeholder:"xxx"});
         $("#telefone1").mask("(999) 99999-9999",{placeholder:"xxx"});
         $("#data").mask("99/99/9999",{placeholder:"00"});
         $(".button-collapse").sideNav();

      });

      $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'right',
        closeOnClick: true
  }
);

/* abertura nav */
  function openNav() {
      document.getElementById("mySidenav").style.width = "300px";
      document.getElementById("main").style.marginLeft = "300px";
  }

  /* Saida Nav */
  function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
  }

  var $toastContent = $('<span>I am toast content</span>');
  Materialize.toast($toastContent, 100);

  $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });

  $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  $('.modal-trigger').leanModal({
          dismissible: true, // Modal can be dismissed by clicking outside of the modal
          opacity: .5, // Opacity of modal background
          in_duration: 300, // Transition in duration
          out_duration: 200, // Transition out duration
          starting_top: '4%', // Starting top style attribute
          ending_top: '10%', // Ending top style attribute
          ready: function() { alert('Ready'); }, // Callback for Modal open
          complete: function() { alert('Closed'); } // Callback for Modal close
      }
  );

  //Conectar sofia
var sessionKey;

$(function(){
   dwr.engine.setActiveReverseAjax(true);
   dwr.engine.setErrorHandler(errorHandler);
   dwr.engine.setTimeout(0);
});

function errorHandler(message, ex){
  log( "ERROR:" + ex.message );
}



function conectarSIB(token, instance){
  var token = "995f66bf89d94ffdb1198ce2de0f1e1b";
  var instance=  "ts:ts"
  sofia2.joinToken(token, instance, function(mensajeSSAP){
    if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
      sessionKey = mensajeSSAP.sessionKey;
      Materialize.toast('Conexão efetuada com sucesso! ' , 4000);
      Materialize.toast('Chave da seção: '+ mensajeSSAP.sessionKey , 4000);

    }else{
      Materialize.toast('Falha na conexão! ' , 4000);
    }
  });
}

function desconectarSIB() {
  sofia2.leave(function(mensajeSSAP){
    if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
      $("#infoConexion").text("Desconectado del sib").show();
    }else{
      $("#infoConexion").text("Error desconectando del sib").show();
    }
  }, sessionKey);
}

//insere dados Pessoa
function enviarPessoa(nome,cpf,telefone,email){
  var ontologyInstance='{"Pessoa_IRGS":{"id":0,"nome":"'+nome+'","cpf":"'+cpf+'","telefones":["'+telefone+'"],"email":"'+email+'"}}';

  sofia2.insert(ontologyInstance, 'Pessoa_IRGS', function(mensajeSSAP){
    if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
      $("#infoSensorTemperatura").text("Enviado").show();

      }else{
      $("#infoSensorTemperatura").text("Error ao Enviar").show();
    }
  }, sessionKey);
}



function inserirEndCad(logradouro,bairro,municipio,cep,dtregistro,favorito,origem){
  var ontologyInstance='{"Enderecos_Cadastro_IRGS":{"id":1,"logradouro":"'+logradouro+'","bairro":"'+bairro+'","municipio":"'+municipio+'","cep":"'+cep+'","dtRegistro":{"$date":{"$date":"2016-07-28T20:12:14.433Z"},"idPessoa":1,"favorito":false,"pontuacao":0,"origemRegistro":"'+origem+'"}}';

  sofia2.insert(ontologyInstance, 'Enderecos_Cadastro_IRGS', function(mensajeSSAP){
    if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
      $("#infoSensorTemperatura").text("Enviado").show();
      }else{
      $("#infoSensorTemperatura").text("Error ao Enviar").show();
    }
  }, sessionKey);
}

function inserirEndNao(endereco){
  var ontologyInstance='{"Checkin_N_Estruturado_IRGS":{"id":1,"endereco":"'+endereco+'","pontuacao":0,"idEndCad":3,"dtRegistro":{"$date":"2016-07-29T08:56:47.433Z"}}}';

  sofia2.insert(ontologyInstance, 'Checkin_N_Estruturado_IRGS', function(mensajeSSAP){
    if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
      $("#infoSensorTemperatura").text("Enviado").show();
      }else{
      $("#infoSensorTemperatura").text("Error ao Enviar").show();
    }
  }, sessionKey);
}

var a;

//Lista Pessas
function listarDados(){

       sofia2.queryWithQueryType("select (islgyn_dadoscadastrais_parquet) from islgyn_dadoscadastrais_parquet","islgyn_dadoscadastrais_parquet","SQLLIKE",null,function(mensajeSSAP){
       if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
              $("#infoSensorTemperatura").text("Dado Alterado").show();
       }else{
              $("#infoSensorTemperatura").text("Erro ao alterar!").show();
       }
       console.log(JSON.stringify(mensajeSSAP.body.data));
       //var conteudo = JSON.stringify(mensajeSSAP.body.data);
       a = mensajeSSAP.body.data;
}, sessionKey);
}


//MostraNãoEstruturados

function mostrarCkNao(){

            var table = '<table>'
            table += '<table style="width:100%">';
            table += '<thead>';
            table += '<tr>';
            table += '<th>Endereço</th>';
            table += '</tr>';
            tabela += '</thead>';
            tabela += '<tbody>';
            for(var x in c){
                tabela += '<tr>';
                tabela +='<th>'+c[x]["Checkin_N_Estruturado_IRGS"]["endereco"]+'</th>';
                tabela += '</tr>';
                  //var cep = a[x]["Endereco_Candidato"]["cep"];
                        }
            tabela += '</tbody>';
            tabela += '</table>';

            mostrarCkNao1.innerHTML = tabela;
        }



//mostrarDadosPessoa
function mostrarPessoas(){

            var tabela = '<table>'

            tabela += '<table style="width:100%">';
            tabela += '<thead>';
            tabela += '<tr>';
            tabela += '<th>ID</th>';
            tabela += '<th>Nome</th>';
            tabela += '<th>CPF</th>';
            tabela += '<th>Email</th>';
            tabela += '</tr>';
            tabela += '</thead>';
            tabela += '<tbody>';
            for(var x in a){
                tabela += '<tr>';
                tabela +='<th>'+a[x]["Pessoa_IRGS"]["id"]+'</th>';
                tabela +='<th>'+a[x]["Pessoa_IRGS"]["nome"]+'</th>';
                tabela +='<th>'+a[x]["Pessoa_IRGS"]["cpf"]+'</th>';
                tabela +='<th>'+a[x]["Pessoa_IRGS"]["email"]+'</th>';
                tabela += '</tr>';

                  //var cep = a[x]["Endereco_Candidato"]["cep"];

        }
            tabela += '</tbody>';
            tabela += '</table>';

            mostrarPessoas1.innerHTML = tabela;
        }


// Mostra Endereço Cadastrado
function mostrarPessoasCad(){

            var tabela = '<table>'

            tabela += '<table style="width:100%">';
            tabela += '<thead>';
            tabela += '<tr>';
            tabela += '<th>logradouro</th>';
            tabela += '<th>Nome</th>';
            tabela += '<th>CPF</th>';
            tabela += '<th>Telefone</th>';
            tabela += '<th>Email</th>';
            tabela += '</tr>';
            tabela += '</thead>';
            tabela += '<tbody>';
            for(var x in a){
                tabela += '<tr>';
                tabela +='<th>'+b[x]["Enderecos_Cadastro_IRGS"]["logradouro"]+'</th>';



                tabela += '</tr>';

                  //var cep = a[x]["Endereco_Candidato"]["cep"];


        }
            tabela += '</tbody>';
            tabela += '</table>';

            mostrarPessoas12.innerHTML = tabela;
        }



//deletaDados

function removeDados(){

       sofia2.removeWithQueryType("delete from Endereco_Candidato where Endereco_Candidato.cep = '75380000'", 'Endereco_Candidato', "SQLLIKE",
       function(mensajeSSAP){
              if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
                     $("#infoSensorTemperatura").text("Dado Alterado").show();
              }else{
                     $("#infoSensorTemperatura").text("Erro ao alterar!").show();
              }
       }, sessionKey);

}

function removePessoa(){

       sofia2.removeWithQueryType("delete from Pessoa_IRGS where Pessoa_IRGS.nome = 'Gustavo'", 'Pessoa_IRGS', "SQLLIKE",
       function(mensajeSSAP){
              if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
                     $("#infoSensorTemperatura").text("Dado Alterado").show();
              }else{
                     $("#infoSensorTemperatura").text("Erro ao alterar!").show();
              }
       }, sessionKey);

}
