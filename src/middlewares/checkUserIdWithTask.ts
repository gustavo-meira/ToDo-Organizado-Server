import { NextFunction, Response } from 'express';
import { ForbiddenError } from '../errors/ForbiddenError';
import { RequestWithUser } from '../interfaces/RequestWithUser';
import { TaskRepository } from '../repositories/prisma/TaskRepository';

const checkUserIdWithTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const { id: taskId } = req.params;

    const taskRepository = new TaskRepository();
    const task = await taskRepository.getById(taskId);

    if (task.userId !== userId) {
      throw new ForbiddenError('User not authorized');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export { checkUserIdWithTask };
