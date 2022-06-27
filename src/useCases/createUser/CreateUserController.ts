import { NextFunction, Request, Response } from 'express';
import { ICreateUser } from './ICreateUser';

class CreateUserController {
  private createUser: ICreateUser;

  constructor(createUser: ICreateUser) {
    this.createUser = createUser;
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const token = await this.createUser.execute({ username, email, password });
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export { CreateUserController };
