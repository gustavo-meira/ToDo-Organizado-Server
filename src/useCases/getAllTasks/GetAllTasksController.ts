import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../interfaces/RequestWithUser';
import { IGetAllTasks } from './IGetAllTasks';

class GetAllTasksController {
  private getAllTasks: IGetAllTasks;

  constructor(getAllTasks: IGetAllTasks) {
    this.getAllTasks = getAllTasks;
  }

  async handle(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const tasks = await this.getAllTasks.execute(id);
      res.status(200).json({ tasks });
    } catch (err) {
      next(err);
    }
  }
}

export { GetAllTasksController };
