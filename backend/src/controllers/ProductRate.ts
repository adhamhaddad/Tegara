import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import ProductRate from '../models/ProductRate';

const productRate = new ProductRate();

const createRate = async (req: Request, res: Response) => {
  try {
    const response = await productRate.createRate(req.body);
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
    const response = await productRate.getRate(req.body);
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
const pr_router_controller = (app: Application, logger: NextFunction) => {
  app.post('/product_rate', logger, verifyToken, createRate);
  app.post('/product_rate', logger, verifyToken, createRate);
  app.post('/product_rate', logger, verifyToken, createRate);
  app.post('/product_rate', logger, verifyToken, createRate);
  app.post('/product_rate', logger, verifyToken, createRate);
};
export default pr_router_controller;
