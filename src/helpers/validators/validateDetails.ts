import { BadRequestError } from '../../errors/BadRequestError';

const validateDetails = (details?: string) => {
  if (!details) return;
  if (typeof details !== 'string') throw new BadRequestError('"details" must be a string');
  if (details.length > 1000) throw new BadRequestError('"details" must be less than 1000 characters');
};

export { validateDetails };
