import { ForbiddenError } from '../../errors/ForbiddenError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ITaskRepository } from '../../repositories/ITaskRepository';
import { IDeleteTask } from './IDeleteTask';

class DeleteTask implements IDeleteTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(id: string, userId: string): Promise<void> {
    const userTasks = await this.taskRepository.getAll(userId);

    if (userTasks.length === 0) {
      throw new NotFoundError('"task" not found');
    }

    const taskIsFromUser = userTasks.some((task) => task.id === id);

    if (!taskIsFromUser) {
      throw new ForbiddenError('"user" is not authorized to delete task');
    }

    await this.taskRepository.delete(id);
  }
}

export { DeleteTask };
