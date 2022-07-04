import { TaskEntity, TaskEntityProps } from '../../entities/TaskEntity';
import { ITaskRepository } from '../../repositories/ITaskRepository';
import { IUpdateTask } from './IUpdateTask';

class UpdateTask implements IUpdateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(task: TaskEntityProps): Promise<void> {
    const taskEntity = new TaskEntity(task);

    await this.taskRepository.update(taskEntity);
  }
}

export { UpdateTask };
