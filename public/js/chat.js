const url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:8080/api/auth/' :
    'https://sams-proyect.herokuapp.com/api/auth/';

let user = null;
let socket = null;

// html references : 
const txtUid = document.getElementById('txtUid');
const txtMessage = document.getElementById('txtMessage');
const listUsers = document.getElementById('listUsers');
const listMessages = document.getElementById('listMessages');
const btnSalir = document.getElementById('btnSalir');

//validate localstorage token
const validateJWT = async() => {

    const token = localStorage.getItem('token') || '';


    if (token.length <= 10) {

        window.location = 'index.html';
        throw new Error('No found token in server');

    }

    const resp = await fetch(url, {
        headers: {
            'x-token': token
        }
    });

    try {
        //resp.json() => convierte el body de la resp en un formato json
        const { user: userDB, token: tokenDB } = await resp.json();
        //console.log(userDB, token);

        localStorage.setItem('token', tokenDB);
        user = userDB;

        document.title = user.name;

        await connectSocket();
    } catch (error) {
        window.location = 'index.html';
    }

}

const connectSocket = async() => {
    const socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token'),
        }
    });

    socket.on('connect', () => {
        console.log('Sockets Online :D !!!');
    });

    socket.on('disconnect', () => {
        console.log('Sockets Offline :(');
    });

    socket.on('receive-sockets', () => {

    });
    socket.on('active-users', (payload) => {
        console.log(payload);
    });
    socket.on('serve-message-priv', () => {

    });
}

const main = async() => {
    //validate JWT token
    await validateJWT();
}

main();