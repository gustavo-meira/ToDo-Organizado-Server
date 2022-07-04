import { TaskEntity } from '../entities/TaskEntity';

interface ITaskRepository {
  create(task: TaskEntity): Promise<void>;
  getAll(userId: string): Promise<TaskEntity[]>;
  delete(id: string): Promise<void>;
  update(task: TaskEntity): Promise<void>;
}

export { ITaskRepository };
