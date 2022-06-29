import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../interfaces/RequestWithUser';
import { ICreateTask } from './ICreateTask';

class CreateTaskController {
  private createTask: ICreateTask;

  constructor(createTask: ICreateTask) {
    this.createTask = createTask;
  }

  async handle(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        title, startDate, deadline, status, details,
      } = req.body;

      const { user: { id: userId } } = req;

      const taskId = await this.createTask.execute({
        title,
        startDate,
        deadline,
        status,
        details,
        userId,
      });

      res.status(201).send({ id: taskId });
    } catch (err) {
      next(err);
    }
  }
}

export { CreateTaskController };
