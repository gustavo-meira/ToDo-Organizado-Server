import { TaskEntity } from '../../entities/TaskEntity';
import { IUUIDProvider } from '../../providers/IUUIDProvider';
import { ITaskRepository } from '../../repositories/ITaskRepository';
import { CreateTaskProps, ICreateTask } from './ICreateTask';

class CreateTask implements ICreateTask {
  private taskRepository: ITaskRepository;
  private uuidProvider: IUUIDProvider;

  constructor(taskRepository: ITaskRepository, uuidProvider: IUUIDProvider) {
    this.taskRepository = taskRepository;
    this.uuidProvider = uuidProvider;
  }

  async execute(taskProps: CreateTaskProps): Promise<string> {
    const {
      title, startDate, deadline, status, details, userId,
    } = taskProps;

    const taskId = this.uuidProvider.generate();

    const task = new TaskEntity({
      id: taskId,
      title,
      startDate,
      deadline,
      status,
      details,
      userId,
    });

    await this.taskRepository.create(task);

    return taskId;
  }
}

export { CreateTask };
