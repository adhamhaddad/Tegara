import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Password from '../models/Password';

const password = new Password();

const createPassword = async (req: Request, res: Response) => {
  try {
    const response = await password.createPassword(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Password created successfully'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updatePassword = async (req: Request, res: Response) => {
  try {
    const response = await password.updatePassword(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Password updated successfully'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const response = await password.resetPassword(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Password reset successfully'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const password_route_controller = (app: Application, logger: NextFunction) => {
  app.post('/password', logger, verifyToken, createPassword);
  app.patch('/password-update', logger, verifyToken, updatePassword);
  app.patch('/password-reset', logger, verifyToken, resetPassword);
};
export default password_route_controller;
