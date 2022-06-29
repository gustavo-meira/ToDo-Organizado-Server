import { BadRequestError } from '../../errors/BadRequestError';

const validateDeadline = (deadline?: Date) => {
  if (deadline === undefined) return;
  if (typeof deadline !== 'object') throw new BadRequestError('"deadline" must be a Date object');
};

export { validateDeadline };
