import { Router } from 'express';
import { errorHandler } from '../middlewares/errorHandler';
import { userRouter } from './userRouter';

const rootRouter = Router();

rootRouter.use('/user', userRouter);

rootRouter.use(errorHandler);

export { rootRouter };
