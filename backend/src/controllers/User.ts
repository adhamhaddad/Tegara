import { Request, Response, NextFunction, Application } from 'express';
import jwt from 'jsonwebtoken';
import configs from '../configs';
import verifyToken from '../middlewares/verifyToken';
import User from '../models/User';
import Password from '../models/Password';

const password = new Password();
const user = new User();

const createUser = async (req: Request, res: Response) => {
  try {
    const response = await user.createUser(req.body);
    await password.createPassword({ ...req.body.password, ...response });
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const response = await user.getUser(req.query.username as string);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const response = await user.updateUser(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'User updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const response = await user.deleteUser(req.body);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'User deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const userAuthenticate = async (req: Request, res: Response) => {
  try {
    const response = await user.userAuthenticate(req.body);
    if (!response) {
      return res.status(400).json({
        status: false,
        message: 'Failed to autheticate user'
      });
    }
    const accessToken = jwt.sign({ response }, configs.token as string);
    res.status(200).json({
      status: true,
      data: { ...response, accessToken },
      message: 'User authenticated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const user_route_controller = (app: Application, logger: NextFunction) => {
  app.post('/user', logger, createUser);
  app.get('/user', logger, verifyToken, getUser);
  app.patch('/user', logger, verifyToken, updateUser);
  app.post('/authenticate-user', logger, userAuthenticate);
};
export default user_route_controller;
