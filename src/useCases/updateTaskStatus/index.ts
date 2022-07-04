import { TaskRepository } from '../../repositories/prisma/TaskRepository';
import { UpdateTaskStatus } from './UpdateTaskStatus';
import { UpdateTaskStatusController } from './UpdateTaskStatusController';

const taskRepository = new TaskRepository();

const updateTaskStatus = new UpdateTaskStatus(taskRepository);
const updateTaskStatusController = new UpdateTaskStatusController(updateTaskStatus);

export { updateTaskStatusController };
