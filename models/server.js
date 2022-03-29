const express = require('express');
require('dotenv');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            product: '/api/product',
            users: '/api/users/'
        }

        //connection DB
        this.connectDB();
        //middlewares
        this.middlewares();
        this.app.use(express.json());
        //app routes
        this.routes();
    }
    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        //cors
        this.app.use(cors());
        //dir public
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.categories, require('../routes/categories.routes'));
        this.app.use(this.paths.product, require('../routes/product.routes'));
        this.app.use(this.paths.users, require('../routes/user.routes'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        });
    }
}

module.exports = Server;