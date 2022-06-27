import { Router } from 'express';
import { validateNewUser } from '../middlewares/validateNewUser';
import { createUserController } from '../useCases/createUser';

const userRouter = Router();

userRouter.post(
  '/',
  validateNewUser,
  (req, res, next) => {
    createUserController.handle(req, res, next);
  },
);

export { userRouter };
