import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/BadRequestError';

const validateUsername = (username: string) => {
  if (username === '' || username === undefined) throw new BadRequestError('"username" is required');
  if (typeof username !== 'string') throw new BadRequestError('"username" must be a string');
  if (username.length < 3) throw new BadRequestError('"username" must be at least 3 characters long');
  if (username.length > 20) throw new BadRequestError('"username" must be at most 20 characters long');
};

const validatePassword = (password: string) => {
  if (password === '' || password === undefined) throw new BadRequestError('"password" is required');
  if (typeof password !== 'string') throw new BadRequestError('"password" must be a string');
  if (password.length < 6) throw new BadRequestError('"password" must be at least 6 characters long');
  if (password.length > 20) throw new BadRequestError('"password" must be at most 20 characters long');
};

const validateEmail = (email: string) => {
  if (email === '' || email === undefined) throw new BadRequestError('"email" is required');
  if (typeof email !== 'string') throw new BadRequestError('"email" must be a string');
  const [prefix = '', domain = ''] = email.split('@');
  if (prefix === '' || domain === '' || !domain.includes('.com')) {
    throw new BadRequestError('"email" must be a valid email');
  }
};

const validateNewUser = (req: Request, res: Response, next: NextFunction) => {
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
