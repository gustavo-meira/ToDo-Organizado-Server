import { TaskEntity } from '../../entities/TaskEntity';

interface IGetAllTasks {
  execute(userId: string): Promise<TaskEntity[]>;
}

export { IGetAllTasks };
