const { Socket } = require("socket.io");

// socket= new Socket() es similar a agregar todos lo metodos
// default de los sockets, para dev esta bien pero para produccion
// debemos procurar no realizar su uso :)
const socketController = (socket = new Socket()) => {

    console.log('connected client', socket.id);
};

module.exports = {
    socketController
}