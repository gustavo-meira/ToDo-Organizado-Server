import { NextFunction, Request, Response } from 'express';
import { TaskStatus } from '../../entities/TaskEntity';
import { IUpdateTaskStatus } from './IUpdateTaskStatus';

class UpdateTaskStatusController {
  private updateTask: IUpdateTaskStatus;

  constructor(updateTask: IUpdateTaskStatus) {
    this.updateTask = updateTask;
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await this.updateTask.execute(id, status as TaskStatus);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export { UpdateTaskStatusController };
