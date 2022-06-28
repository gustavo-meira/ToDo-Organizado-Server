import { NextFunction, Request, Response } from 'express';
import { validateEmail, validatePassword } from '../helpers/validators';

const validateLoginUser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    validateEmail(email);
    validatePassword(password);
    next();
  } catch (err) {
    next(err);
  }
};

export { validateLoginUser };
