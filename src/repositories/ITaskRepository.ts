import { TaskEntity } from '../entities/TaskEntity';

interface ITaskRepository {
  create(task: TaskEntity): Promise<void>;
  getAll(userId: string): Promise<TaskEntity[]>;
}

export { ITaskRepository };
