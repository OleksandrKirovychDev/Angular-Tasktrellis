import express from 'express';
import { UserController } from '../controllers/user.controller';
import { errorHandler } from '../middlware/error.middleware';

const Router = express.Router();

Router.post('/signup', errorHandler, UserController.signup).post(
  '/signin',
  errorHandler,
  UserController.signin
);

export { Router as userRouter };
