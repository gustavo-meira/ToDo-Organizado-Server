import { BadRequestError } from '../../errors/BadRequestError';

const validateTitle = (title: string) => {
  if (title === '' || title === undefined) throw new BadRequestError('"title" is required');
  if (typeof title !== 'string') throw new BadRequestError('"title" must be a string');
  if (title.length < 3) throw new BadRequestError('"title" must be at least 3 characters long');
};

export { validateTitle };
