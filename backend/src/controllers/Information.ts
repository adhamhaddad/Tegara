import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Information from '../models/Information';

const info = new Information();

const createInfo = async (req: Request, res: Response) => {
  try {
    const response = await info.createInfo(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Info created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getInfo = async (req: Request, res: Response) => {
  try {
    const response = await info.getInfo(req.query.username as string);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Info received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateInfo = async (req: Request, res: Response) => {
  try {
    const response = await info.updateInfo(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Info updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const info_route_controller = (app: Application, logger: NextFunction) => {
  app.post('/information', logger, verifyToken, createInfo);
  app.get('/information', logger, verifyToken, getInfo);
  app.patch('/information', logger, verifyToken, updateInfo);
};
export default info_route_controller;
