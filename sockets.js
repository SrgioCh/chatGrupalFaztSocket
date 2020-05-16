const socket = (io) => {
  //simularemos que esta dentro de una BD
  let nickNames = []; //aqui

  io.on("connection", (socket) => {
    console.log("un nuevo usuario conectado");
    /****************************HACIENDO LOGIN *********************************** */
    //RECIBIMOS  NICK DEL CLIENTE
    socket.on("new user", (nick, callback) => {
      console.log(nick);
      if (nickNames.indexOf(nick) > -1) {
        //el nick ya existe
        callback(false);
      } else {
        callback(true); //el nick no existe, puede ingresar
        socket.nickname = nick;
        nickNames.push(socket.nickname);

        //ENVIAREMOS EL NICK DEL USUARIOS CONECTADOS A TODOS
        io.sockets.emit("usernames", nickNames);
      }
    });

    /**************************ENVIANDO MENSAJE CHAT ********************************* */
    //RECIBIMOS EL MENSAJE DE UN CLIENTE
    socket.on("send message", (mensaje) => {
      //socket : solo tiene la conexion d eun solo cliente
      //io.sockets: tiene la informacion de todos los que se conectan
      //ENVIAREMOS MENSAJE A TODOS LOS CLIENTES
      io.sockets.emit("new message", {
        //esto lo que respondera a nuestro navegador
        nik: socket.nickname,
        msg: mensaje,
      });
    });

    // *************************DESCONECION DE USUARIO (Un socket) **********************
    socket.on("disconnect", (data) => {
      if (!socket.nickname) return; //si no tiene ese nickname  , pues nada
      //si lo tiene :
      nickNames.splice(nickNames.indexOf(socket.nickname), 1);
      //ENVIAREMOS LOS NUEVOS NICKS , sin el que se fue
      io.sockets.emit("usernames", nickNames);
    });
  });
};

module.exports = socket;
