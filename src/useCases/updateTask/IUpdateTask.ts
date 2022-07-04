import { TaskEntityProps } from '../../entities/TaskEntity';

interface IUpdateTask {
  execute(task: TaskEntityProps): Promise<void>;
}

export { IUpdateTask };
