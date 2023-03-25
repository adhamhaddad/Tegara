import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization as string;
    const token = authorization.split(' ')[1];
    fs.readFile(
      path.join(__dirname, '..', 'keys', 'public.key'),
      { encoding: 'utf8' },
      (err, publicKey) => {
        const decode = jwt.verify(token, publicKey);
        if (decode) {
          next();
        }
      }
    );
  } catch (err) {
    res.status(400).json({
      status: false,
      message: `You not authorized. ${(err as Error).message}`
    });
  }
};
export default verifyToken;
