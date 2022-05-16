const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers/auth.token");
const { ChatMessages } = require("../models")

const chatMessages = new ChatMessages();
// socket= new Socket() es similar a agregar todos lo metodos
// default de los sockets, para dev esta bien pero para produccion
// debemos procurar no realizar su uso :)
const socketController = async(socket = new Socket(), io) => {

    const token = socket.handshake.headers['x-token'];

    const user = await checkJWT(token);

    if (!user) {
        socket.disconnect();
    }

    chatMessages.connectUser(user);
    io.emit('active-users', chatMessages.usersArray);


    socket.on('disconnect', () => {

        chatMessages.disconnectUser(user.id);
        io.emit('active-users', chatMessages.usersArray);

    });
};

module.exports = {
    socketController
}