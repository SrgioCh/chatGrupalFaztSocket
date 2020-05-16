$(() => {
  const conex_user = io();

  //obteniendo DOM para login
  const nickname = $("#nickname");
  const formuLogin = $("#form-login");
  const errornick = $("#error");
  //obteniendo los elementos del DOM CHAT COMPLETO
  const form = $("#form-message");
  const chat = $("#chat");
  const cuerpoChat = $("#cuerpoChat");
  const menssage = $("#message");
  const usuarios = $("#usersnames");
  //----------------------------------ENVIAREMOS AL SERVIDOR-------------------------------------------------

  /* **************haciendo login  *******************/
  //capturando eventos
  formuLogin.submit((e) => {
    e.preventDefault();
    let nick = nickname.val();
    // new user : evento customizado
    conex_user.emit("new user", nick, (res_servidor) => {
      if (res_servidor) {
        formuLogin.hide();
        chat.show();
      } else {
        console.log("ese nombre ya existe");
        errornick.html(
          "<small class='text-danger'>error de nickname exist</small>"
        );
        setTimeout(() => {
          errornick.hide();
        }, 6000);
      }
      nickname.val("");
    });
  });
  /* ********************enviando mensaje ****************** */
  form.submit((e) => {
    e.preventDefault();
    let mensaje = menssage.val();
    //ENVIAREMOS EL MENSAJE
    conex_user.emit("send message", mensaje);
    menssage.val(""); //limpiando el input
  });

  //---------------------------RECIBIREMOS DEL SERVIDOR PARA TODOS ---------------------------------------------------

  /* ****** usuarios y sus mensajes  [chat principal]******** */
  conex_user.on("new message", (data) => {
    let html = `<small class="text-dark">${data.nik} :</small><small class="ml-2">${data.msg}</small><br/>`;
    cuerpoChat.append(html);
  });

  /* *********usuarios conectados[tabla de usuarios]****** */
  conex_user.on("usernames", (datos) => {
    console.log(datos);
    let html = "";

    datos.map((nick) => {
      html += `<p>
           <ion-icon name="person-outline"></ion-icon><small class='text-dark ml-2'>${nick}</small>
            </p>`;
    });
    usuarios.html(html);
  });
});
