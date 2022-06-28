import { BadRequestError } from '../../errors/BadRequestError';

const validateEmail = (email: string) => {
  if (email === '' || email === undefined) throw new BadRequestError('"email" is required');
  if (typeof email !== 'string') throw new BadRequestError('"email" must be a string');
  const [prefix = '', domain = ''] = email.split('@');
  if (prefix === '' || domain === '' || !domain.includes('.com')) {
    throw new BadRequestError('"email" must be a valid email');
  }
};

export { validateEmail };
