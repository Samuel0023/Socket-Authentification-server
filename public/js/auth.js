const myForm = document.querySelector('form');

const url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:8080/api/auth/' :
    'https://chat-with-sockets-samuel.herokuapp.com/api/auth/';


myForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = {};
    for (let elem of myForm.elements) {
        if (elem.name.length > 0) {
            formData[elem.name] = elem.value;
        }
    }

    fetch(url + 'login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-type': 'application/json' }
        })
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            if (msg) {
                return console.error(msg);
            }
            localStorage.setItem('token', token);
            window.location = 'chat.html';

        })
        .catch(err => { console.log(err); });
});

function handleCredentialResponse(response) {

    // Google Token :  ID_TOKEN 
    //console.log(response.credential);
    let body = {
        id_token: response.credential
    };

    fetch(url + 'google',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        .then(resp => resp.json())
        .then(({ user, token }) => {
            // console.log(token);
            console.log(user, token);
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch(console.log);

}

var button = document.getElementById('google_signout');

button.onclick = () => {
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('mail'), done => {
        localStorage.clear();
        location.reload();
    });

}