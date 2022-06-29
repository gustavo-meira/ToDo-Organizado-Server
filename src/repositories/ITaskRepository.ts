import { TaskEntity } from '../entities/TaskEntity';

interface ITaskRepository {
  create(task: TaskEntity): Promise<void>;
}

export { ITaskRepository };
