import express, { Application, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'socket.io';
import configs from './configs';
import logger from './middlewares/logger';
import morgan from 'morgan';
import admin_route_controller from './controllers/Admin';
import user_route_controller from './controllers/User';
import info_route_controller from './controllers/Information';
import order_route_controller from './controllers/Order';
import password_route_controller from './controllers/Password';
import product_route_controller from './controllers/Product';
import pr_router_controller from './controllers/ProductRate';
import ur_router_controller from './controllers/UserRate';

// Express App
const app: Application = express();
const port: Number = configs.port || 8080;

// CORS Configurations
const corsOptions = {
  origin: '*',
  statusSuccess: 200,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD']
};

// App Middlewares
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// App Controllers
admin_route_controller(app, logger as NextFunction);
user_route_controller(app, logger as NextFunction);
info_route_controller(app, logger as NextFunction);
order_route_controller(app, logger as NextFunction);
password_route_controller(app, logger as NextFunction);
product_route_controller(app, logger as NextFunction);
pr_router_controller(app, logger as NextFunction);
ur_router_controller(app, logger as NextFunction);

// App Server
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log('Press CTRL+C to stop the server ..');
});

const io = new Server(server);
io.on('connect', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

export { app, port, io };
