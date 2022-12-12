import express, { Application, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'socket.io';
import configs from './configs';

// Express App
const app: Application = express();
const port: Number = Number(configs.port) || 8080;

// CORS Configurations
const corsOptions = {
  origin: '*',
  statusSuccess: 200,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'HEAD']
};

// App Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// App Controllers


// App Server
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log('Press CTRL+C to stop the server ..');
});

export const io = new Server(server);
io.on('connect', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
export default app;
