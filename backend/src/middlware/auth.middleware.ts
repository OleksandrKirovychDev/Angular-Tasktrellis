import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AppDataSource } from '../database/data-source';
import { User } from '../entity/user.entity';

dotenv.config();

export const authentification = (
  req: Request & { currentUser: string | jwt.JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!process.env.JWT_SECRET) throw Error('no jwt secret provided');
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  if (!decode) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req['currentUser']! = decode;
  next();
};

export const authorization = (roles: string[]) => {
  return async (
    req: Request & { currentUser: string | jwt.JwtPayload },
    res: Response,
    next: NextFunction
  ) => {
    const userRepo = AppDataSource.getRepository(User);
    const currentUser = req['currentUser'] as User;

    const user = await userRepo.findOne({
      where: { id: currentUser.id },
    });

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
