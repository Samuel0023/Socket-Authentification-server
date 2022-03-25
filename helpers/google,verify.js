const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async(token = '') => {
    let ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    //const payload = ticket.getPayload();
    const { name, picture, email } = ticket.getPayload();

    return {
        name,
        img: picture,
        mail: email
    }
}


module.exports = { googleVerify }