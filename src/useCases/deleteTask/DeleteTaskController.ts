import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../interfaces/RequestWithUser';
import { IDeleteTask } from './IDeleteTask';

class DeleteTaskController {
  private deleteTask: IDeleteTask;

  constructor(deleteTask: IDeleteTask) {
    this.deleteTask = deleteTask;
  }

  async handle(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user;
      await this.deleteTask.execute(id, userId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export { DeleteTaskController };
