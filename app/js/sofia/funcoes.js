/* abertura nav */
// function openNav() {
//     document.getElementById("mySidenav").style.width = "300px";
//     document.getElementById("main").style.marginLeft = "300px";
// }
//
// /* Saida Nav */
// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
//     document.getElementById("main").style.marginLeft = "0";
// }
//
// var $toastContent = $('<span>I am toast content</span>');
// // Materialize.toast($toastContent, 100);
//
// $('.message a').click(function(){
//     $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
// });
//
// $('.datepicker').pickadate({
//     selectMonths: true, // Creates a dropdown to control month
//     selectYears: 15 // Creates a dropdown of 15 years to control year
// });
// $('.modal-trigger').leanModal({
//         dismissible: true, // Modal can be dismissed by clicking outside of the modal
//         opacity: .5, // Opacity of modal background
//         in_duration: 300, // Transition in duration
//         out_duration: 200, // Transition out duration
//         starting_top: '4%', // Starting top style attribute
//         ending_top: '10%', // Ending top style attribute
//         ready: function() { alert('Ready'); }, // Callback for Modal open
//         complete: function() { alert('Closed'); } // Callback for Modal close
//     }
// );

//
// $(function(){
//    dwr.engine.setActiveReverseAjax(true);
//    dwr.engine.setErrorHandler(errorHandler);
//    dwr.engine.setTimeout(0);
// });
//
// function errorHandler(message, ex){
//   log( "ERROR:" + ex.message );
// }


//Conectar sofia
var sessionKey;

function conectarSIB(token, instance){
     var token = "a613b367ba7a419ca014a55255aae9f7";
     var instance=  "gustavo:gustavo"
 // var token = "abde472c4c674f89a934941da604c9c3";
 //  var instance=  "indragyn:sefaz"
  sofia2.joinToken(token, instance, function(mensajeSSAP){
    if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
      sessionKey = mensajeSSAP.sessionKey;
      Materialize.toast('Conexão efetuada com sucesso! ' , 4000);
      Materialize.toast('Chave da seção: '+ mensajeSSAP.sessionKey , 4000);
      console.log("Sucesso!!");
    }else{
      Materialize.toast('Falha na conexão! ' , 4000);
      console.log("Falha ao Logar!!");
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
       // sofia2.queryWithQueryType("select * from islgyn_sefaz_enderecos_checkin_parquet"
       //       ,"islgyn_sefaz_enderecos_checkin_parquet","BDH",null,function(mensajeSSAP){
           sofia2.queryWithQueryType("select * from islgyn_dadoscadastrais ","islgyn_dadoscadastrais","BDH",null,function(mensajeSSAP){
       if(mensajeSSAP != null && mensajeSSAP.body.data != null && mensajeSSAP.body.ok == true){
              $("").text("Sucess").show();
       }else{
              $("").text("Error!").show();
       }
       console.log(JSON.stringify(mensajeSSAP.body.data));
       //var conteudo = JSON.stringify(mensajeSSAP.body.data);
           a = JSON.stringify(mensajeSSAP.body.data);

               var x = document.getElementById("myP").innerHTML;
               document.getElementById("demo").innerHTML = a;

}, sessionKey);



}


//mostrarDados
function mostrarDados(){






}



