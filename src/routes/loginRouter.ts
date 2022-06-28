import { Router } from 'express';
import { validateLoginUser } from '../middlewares/validateLoginUser';
import { loginUserController } from '../useCases/loginUser';

const loginRouter = Router();

loginRouter.post('/', validateLoginUser, (req, res, next) => {
  loginUserController.handle(req, res, next);
});

export { loginRouter };
