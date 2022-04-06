import express, { Application } from 'express';
import morgan from "morgan";
import cors from "cors";

import usuariosRoutes from "../routes/usuarios.routes";

export class App {

    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false}))
    }

    routes() {
        this.app.use('/kinjo/users', usuariosRoutes);
    }

    async start() {
        await this.app.listen(this.app.get('port'));
        console.log('Servidor ha sido iniciado en puerto: ', this.app.get('port'));
    }
}