import { Router } from 'express';
import { errorHandler } from '../middlewares/errorHandler';
import { loginRouter } from './loginRouter';
import { taskRouter } from './taskRouter';
import { userRouter } from './userRouter';

const rootRouter = Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/login', loginRouter);
rootRouter.use('/task', taskRouter);

rootRouter.use(errorHandler);

export { rootRouter };
