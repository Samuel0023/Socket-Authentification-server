const url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:8080/api/auth/' :
    'https://sams-proyect.herokuapp.com/api/auth/';

let user = null;
let socket = null;
let usersActive = [];
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
    socket = io({
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

    socket.on('receive-message', showChatMessages);

    socket.on('active-users', showActiveUsers);
    socket.on('serve-message-priv', (payload) => {
        console.log('Private ', payload);
    });
}

const showActiveUsers = (users = []) => {
    let usersHtml = '';
    usersActive = users;
    users.forEach((user) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${user.name}</h5>
                    <span class="fs-6 text-muted">${user.uid}</span>
                </p>
            </li>
        `
    });

    listUsers.innerHTML = usersHtml;
}
const showChatMessages = (messages = []) => {
    let messagesHtml = '';
    messages.reverse().forEach((message) => {
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${message.name}</span>
                    <span>${message.msg}</span>
                </p>
            </li>
        `
    });
    listMessages.innerHTML = messagesHtml;
}

txtMessage.addEventListener('keyup', (ev) => {
    let message = txtMessage.value;
    let uid = txtUid.value;
    if (ev.key === 'Enter') {
        if (message.length > 0) {

            socket.emit('send-message', { message, uid });
            txtMessage.value = '';
        }
    }
});
const checkUidActive = (uid) => {
    return usersActive.filter(user => user.uid === uid).length > 0;
}
const main = async() => {
    //validate JWT token
    await validateJWT();
}

main();