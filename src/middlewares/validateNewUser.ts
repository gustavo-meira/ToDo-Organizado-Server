import { NextFunction, Request, Response } from 'express';
import { validateEmail, validatePassword, validateUsername } from '../helpers/validators';

const validateNewUser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    validateUsername(username);
    validatePassword(password);
    validateEmail(email);
    next();
  } catch (err) {
    next(err);
  }
};

export { validateNewUser };
