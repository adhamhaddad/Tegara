import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import UserRate from '../models/UserRate';

const userRate = new UserRate();

const createRate = async (req: Request, res: Response) => {
  try {
    const response = await userRate.createRate(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Rate created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getRates = async (req: Request, res: Response) => {
  try {
    const response = await userRate.getRate(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Rate created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

//! Need Fix
const ur_router_controller = (app: Application, logger: NextFunction) => {
  app.post('/user_rate', logger, verifyToken, createRate);
  app.post('/user_rate', logger, verifyToken, createRate);
  app.post('/user_rate', logger, verifyToken, createRate);
  app.post('/user_rate', logger, verifyToken, createRate);
  app.post('/user_rate', logger, verifyToken, createRate);
};
export default ur_router_controller;
