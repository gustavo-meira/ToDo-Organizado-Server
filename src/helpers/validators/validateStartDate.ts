import { BadRequestError } from '../../errors/BadRequestError';

const validateStartDate = (startDate?: Date) => {
  if (startDate === undefined) return;
  if (typeof startDate !== 'object') throw new BadRequestError('"startDate" must be a Date object');
};

export { validateStartDate };
