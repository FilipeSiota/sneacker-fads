// $('#addSneacker').attr('disabled', true);

// var validation = window.prompt("Informe a senha de administrador:");
// var admin = false;

// $.getJSON("../admin/admin.json", function(data) {

//     if (data.admin.password != validation)
//     {
//         alert("Senha inválida! Você será redirecionado para a página de cliente.");

//         window.location.replace("index.html");
//     }
//     else
//     {
//         $('#addSneacker').attr('disabled', false);

//         admin = true;
//     }
// })

$('#addSneacker').attr('disabled', false);
var admin = true;