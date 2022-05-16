const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers/auth.token");

// socket= new Socket() es similar a agregar todos lo metodos
// default de los sockets, para dev esta bien pero para produccion
// debemos procurar no realizar su uso :)
const socketController = async(socket = new Socket()) => {

    const token = socket.handshake.headers['x-token'];

    const user = await checkJWT(token);

    return (!user) ? socket.disconnect() : console.log("Se conecto: ", user.name);

};

module.exports = {
    socketController
}