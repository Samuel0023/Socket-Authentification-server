const express = require('express');
const cors = require('cors');

const { router } = require('../routes/user.routes');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.port;
        this.usersPath = '/api/users';
        //middlewares
        this.middlewares();
        this.app.use(express.json());
        //app routes
        this.routes();
    }

    middlewares() {
        //cors
        this.app.use(cors());
        //dir public
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        });
    }
}

module.exports = Server;