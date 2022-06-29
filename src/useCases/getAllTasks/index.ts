import { TaskRepository } from '../../repositories/prisma/TaskRepository';
import { GetAllTasks } from './GetAllTasks';
import { GetAllTasksController } from './GetAllTasksController';

const taskRepository = new TaskRepository();

const getAllTasks = new GetAllTasks(taskRepository);
const getAllTasksController = new GetAllTasksController(getAllTasks);

export { getAllTasksController };
