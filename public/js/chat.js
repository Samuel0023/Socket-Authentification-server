const url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:8080/api/auth/' :
    'https://sams-proyect.herokuapp.com/api/auth/';

let user = null;
let socket = null;

//validate localstorage token
const validarJWT = async() => {

    const token = localStorage.getItem('token');

    if (token.length <= 11) {

        window.location = 'index.html';
        throw new Error('No found token in server');

    }

    const resp = await fetch(url, {
        headers: {
            'x-token': token
        }
    });

    //resp.json() => convierte el body de la resp en un formato json
    const { user: userDB, token: tokenDB } = await resp.json();
    console.log(userDB, tokenDB);

    localStorage.setItem('token', tokenDB);
}

const main = async() => {
    //validate JWT token
    await validarJWT();
}

main();
//const socket = io();