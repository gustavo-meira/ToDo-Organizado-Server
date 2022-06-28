import { BadRequestError } from '../../errors/BadRequestError';

const validatePassword = (password: string) => {
  if (password === '' || password === undefined) throw new BadRequestError('"password" is required');
  if (typeof password !== 'string') throw new BadRequestError('"password" must be a string');
  if (password.length < 6) throw new BadRequestError('"password" must be at least 6 characters long');
  if (password.length > 20) throw new BadRequestError('"password" must be at most 20 characters long');
};

export { validatePassword };
