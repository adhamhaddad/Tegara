import { Request, Response, NextFunction, Application } from 'express';
import jwt from 'jsonwebtoken';
import configs from '../configs';
import verifyToken from '../middlewares/verifyToken';
import Admin from '../models/Admin';

const admin = new Admin();

const createAdmin = async (req: Request, res: Response) => {
  try {
    const response = await admin.createAdmin(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Admin created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getAdmin = async (req: Request, res: Response) => {
  try {
    const response = await admin.getAdmin(req.query.username as string);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Admin received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const response = await admin.updateAdmin(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Admin updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const response = await admin.deleteAdmin(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Admin deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const adminAuthenticate = async (req: Request, res: Response) => {
  try {
    const response = await admin.adminAuthenticate(req.body);
    const accessToken = jwt.sign({ response }, configs.token as string);
    if (!response) {
      return res.status(400).json({
        status: true,
        message: 'Failed to authenticate!'
      });
    }
    res.status(201).json({
      status: true,
      data: { ...response, accessToken },
      message: 'Admin authenticated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const admin_route_controller = (app: Application, logger: NextFunction) => {
  app.post('/admin', logger, createAdmin);
  app.post('/admin', logger, verifyToken, getAdmin);
  app.patch('/admin', logger, verifyToken, updateAdmin);
  app.delete('/admin', logger, verifyToken, deleteAdmin);
  app.post('/admin-authenticate', logger, adminAuthenticate);
};
export default admin_route_controller;
