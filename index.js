const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
server = http.createServer(app);
const io = socketio.listen(server);

app.set("port", process.env.PORT || 3000);
const puerto = app.get("port");
const codigo_socket = require("./sockets"); //almacenamos el codigo de sockt io por limpieza de codigo
codigo_socket(io);

const rutaPublic = path.join(__dirname, "public");
app.use(express.static(rutaPublic));

server.listen(puerto, () => {
  console.log("runing en puerto : " + puerto);
});

/*   https://www.youtube.com/watch?v=nAQEvcehyqo&list=PLL0TiOXBeDahUYFcY3nTfzqTsuL0wA1jW&index=3 */
