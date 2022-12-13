import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Order from '../models/Order';

const order = new Order();

const createOrder = async (req: Request, res: Response) => {
  try {
    const response = await order.createOrder(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Order created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getOrder = async (req: Request, res: Response) => {
  try {
    const response = await order.getOrder(req.query.order_id as string);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Order received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const response = await order.getOrders(req.query.user_id as string);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Orders received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const response = await order.updateOrder(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Order updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const response = await order.deleteOrder(req.body);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Order deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const order_route_controller = (app: Application, logger: NextFunction) => {
  app.post('/order', logger, verifyToken, createOrder);
  app.get('/order', logger, verifyToken, getOrder);
  app.get('/orders', logger, verifyToken, getOrders);
  app.patch('/order', logger, verifyToken, updateOrder);
  app.delete('/order', logger, verifyToken, deleteOrder);
};
export default order_route_controller;
