import { TaskStatus } from '../../entities/TaskEntity';
import { BadRequestError } from '../../errors/BadRequestError';

const validateStatus = (status?: TaskStatus) => {
  if (!status) return;
  if (typeof status !== 'string') throw new BadRequestError('"status" must be a string');
  if (status !== 'completed' && status !== 'in progress' && status !== 'pending') {
    throw new BadRequestError('"status" must be one of "pending", "in-progress", "completed"');
  }
};

export { validateStatus };
