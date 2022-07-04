import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../interfaces/RequestWithUser';
import { IUpdateTask } from './IUpdateTask';

class UpdateTaskController {
  private updateTask: IUpdateTask;

  constructor(updateTask: IUpdateTask) {
    this.updateTask = updateTask;
  }

  async handle(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const {
        title,
        details,
        deadline,
        startDate,
        status,
      } = req.body;

      const { id: userId } = req.user;

      const { id } = req.params;

      await this.updateTask.execute({
        id,
        title,
        details,
        deadline,
        startDate,
        status,
        userId,
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export { UpdateTaskController };
