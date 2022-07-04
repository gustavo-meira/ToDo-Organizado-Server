import { TaskStatus } from '../../entities/TaskEntity';

interface IUpdateTaskStatus {
  execute(taskId: string, status: TaskStatus): Promise<void>;
}

export { IUpdateTaskStatus };
