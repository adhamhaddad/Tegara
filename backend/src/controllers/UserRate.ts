import { Request, Response, NextFunction, Application } from 'express';
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

  