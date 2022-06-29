import { TaskRepository } from '../../repositories/prisma/TaskRepository';
import { DeleteTask } from './DeleteTask';
import { DeleteTaskController } from './DeleteTaskController';

const taskRepository = new TaskRepository();

const deleteTask = new DeleteTask(taskRepository);
const deleteTaskController = new DeleteTaskController(deleteTask);

export { deleteTaskController };
