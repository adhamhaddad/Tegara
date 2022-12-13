import { Request, Response, NextFunction, Application } from 'express';
import verifyToken from '../middlewares/verifyToken';
import Product from '../models/Product';

const product = new Product();

const createProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.createProduct(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Product created successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.getProduct(req.query.product_id as string);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Product received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const response = await product.getProducts(req.query.user_id as string);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Products received successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.updateProduct(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Product updated successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.deleteProduct(req.body);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Product deleted successfully!'
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message
    });
  }
};

const product_route_controller = (app: Application, logger: NextFunction) => {
  app.post('/product', logger, verifyToken, createProduct);
  app.get('/products', logger, getProducts);
  app.get('/product', logger, getProduct);
  app.patch('/product', logger, verifyToken, updateProduct);
  app.delete('/product', logger, verifyToken, deleteProduct);
};
export default product_route_controller;
