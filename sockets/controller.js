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
    socket.emit('receive-message', chatMessages.last10Msg);
    //sala especial :D 
    socket.join(user.id);
    socket.on('disconnect', () => {

        chatMessages.disconnectUser(user.id);
        io.emit('active-users', chatMessages.usersArray);

    });

    socket.on('send-message', ({ message, uid }) => {
        if (uid) {

            socket.to(uid).emit('serve-message-priv', { from: user.name, message });
        } else {
            chatMessages.sendMessage(user.id, user.name, message);
            io.emit('receive-message', chatMessages.last10Msg);
        }
    });
};

module.exports = {
    socketController
}