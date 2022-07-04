import { TaskRepository } from '../../repositories/prisma/TaskRepository';
import { UpdateTask } from './UpdateTask';
import { UpdateTaskController } from './UpdateTaskController';

const taskRepository = new TaskRepository();

const updateTask = new UpdateTask(taskRepository);
const updateTaskController = new UpdateTaskController(updateTask);

export { updateTaskController };
