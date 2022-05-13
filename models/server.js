const express = require('express');
require('dotenv');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { createServer } = require('http');
const { dbConnection } = require('../database/config.db');
const { socketController } = require('../sockets/controller');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            product: '/api/product',
            search: '/api/search',
            users: '/api/users/',
            uploads: '/api/uploads'
        }

        //connection DB
        this.connectDB();
        //middlewares
        this.middlewares();
        this.app.use(express.json());
        //app routes
        this.routes();
        //sockets
        this.sockets();
    }
    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        //cors
        this.app.use(cors());
        //dir public
        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
        this.app.use(this.paths.product, require('../routes/product.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));

    }
    sockets() {
        this.io.on('connection', socketController);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        });
    }
}

module.exports = Server;