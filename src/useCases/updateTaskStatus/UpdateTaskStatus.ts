import { TaskStatus } from '../../entities/TaskEntity';
import { BadRequestError } from '../../errors/BadRequestError';
import { ITaskRepository } from '../../repositories/ITaskRepository';
import { IUpdateTaskStatus } from './IUpdateTaskStatus';

class UpdateTaskStatus implements IUpdateTaskStatus {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId: string, status: TaskStatus): Promise<void> {
    if (!status) {
      throw new BadRequestError('"status" is required');
    }

    if (status !== 'completed' && status !== 'in progress' && status !== 'pending') {
      throw new BadRequestError('invalid "status"');
    }

    await this.taskRepository.updateStatus(taskId, status);
  }
}

export { UpdateTaskStatus };
