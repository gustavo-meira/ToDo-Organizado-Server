import { TaskStatus } from '../../entities/TaskEntity';

type CreateTaskProps = {
  title: string;
  startDate?: Date;
  deadline?: Date;
  status?: TaskStatus;
  details?: string;
  userId: string;
}

interface ICreateTask {
  execute(taskProps: CreateTaskProps): Promise<string>;
}

export { ICreateTask, CreateTaskProps };
