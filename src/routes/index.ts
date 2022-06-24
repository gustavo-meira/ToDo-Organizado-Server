import { Router } from 'express';
import { userRouter } from './userRouter';

const rootRouter = Router();

rootRouter.use('/user', userRouter);

export { rootRouter };
