import { NextFunction, Request, Response } from 'express';
import { ILoginUser } from './ILoginUser';

class LoginUserController {
  private loginUser: ILoginUser;

  constructor(loginUser: ILoginUser) {
    this.loginUser = loginUser;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.loginUser.execute({ email, password });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export { LoginUserController };
