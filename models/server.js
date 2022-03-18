const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.port;
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send('hello world');
        });
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        });
    }
}

module.exports = Server;