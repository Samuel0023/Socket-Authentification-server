function handleCredentialResponse(response) {

    // Google Token :  ID_TOKEN 
    //console.log(response.credential);
    let body = {
        id_token: response.credential
    };

    fetch(window.location.hostname.includes('localhost')

            ?
            'http://localhost:8080/api/auth/google'

            :
            'https://sams-proyect.herokuapp.com/api/auth/google',

            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
        .then(resp => resp.json())
        .then(resp => {
            // console.log(token);
            console.log(resp.token);
            localStorage.setItem('mail', resp.user.mail);
            localStorage.setItem('token', resp.token);
            //location.reload();
        })
        .catch(console.warn);

}

var button = document.getElementById('google_signout');

button.onclick = () => {
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('mail'), done => {
        localStorage.clear();
        location.reload();
    });

}