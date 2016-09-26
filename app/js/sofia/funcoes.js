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
  var token = "a613b367ba7a419ca014a55255aae9f7";
  var instance=  "gustavo:gustavo"
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


var a;

//Lista Dados
function listarDados(){

       sofia2.queryWithQueryType("select * from islgyn_dadoscadastrais","islgyn_dadoscadastrais","BDH",null,function(mensajeSSAP){
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



//mostrarDados
function mostrarDados(){

            var tabela = '<table>'

            tabela += '<table style="width:100%">';
            tabela += '<thead>';
            tabela += '<tr>';
            tabela += '<th>tipo_pessoa</th>';
            tabela += '<th>numr_documento</th>';
            tabela += '<th>numr_documento</th>';
            tabela += '<th>codg_sexo</th>';
            tabela += '<th>codg_sexo</th>';
            tabela += '<th>codg_sexo</th>';
            tabela += '<th>codg_sexo</th>';
            tabela += '</tr>';
            tabela += '</thead>';
            tabela += '<tbody>';
            for(var x in a){
                tabela += '<tr>';
                tabela +='<th>'+a[x]["islgyn_dadoscadastrais"]["tipo_pessoa"]+'</th>';
                tabela +='<th>'+a[x]["islgyn_dadoscadastrais"]["numr_documento"]+'</th>';
                tabela +='<th>'+a[x]["islgyn_dadoscadastrais"]["numr_documento"]+'</th>';
                tabela +='<th>'+a[x]["islgyn_dadoscadastrais"]["codg_sexo"]+'</th>';
                tabela +='<th>'+a[x]["islgyn_dadoscadastrais"]["codg_sexo"]+'</th>';
                tabela +='<th>'+a[x]["islgyn_dadoscadastrais"]["codg_sexo"]+'</th>';
                tabela +='<th>'+a[x]["islgyn_dadoscadastrais"]["codg_sexo"]+'</th>';
                tabela += '</tr>';
                  //var cep = a[x]["Endereco_Candidato"]["cep"];
        }
            tabela += '</tbody>';
            tabela += '</table>';

            mostrarPessoas.innerHTML = tabela;
        }


