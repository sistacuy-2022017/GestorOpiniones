'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import usersRoutes from '../src/users/user.routes.js';
import logRoutes from '../src/auth/auth.routes.js';
import publicationsRoutes from '../src/publications/publications.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/PublicationsApi/v1/users';
        this.logPath = '/PublicationsApi/v1/login';
        this.publicationPath = '/PublicationsApi/v1/publication';
        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.usersPath, usersRoutes);
        this.app.use(this.logPath, logRoutes);
        this.app.use(this.publicationPath, publicationsRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }
}

export default Server;