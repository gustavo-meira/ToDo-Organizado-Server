import { TaskEntity } from '../../entities/TaskEntity';
import { ITaskRepository } from '../../repositories/ITaskRepository';
import { IGetAllTasks } from './IGetAllTasks';

class GetAllTasks implements IGetAllTasks {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(userId: string): Promise<TaskEntity[]> {
    const tasks = await this.taskRepository.getAll(userId);

    return tasks;
  }
}

export { GetAllTasks };
