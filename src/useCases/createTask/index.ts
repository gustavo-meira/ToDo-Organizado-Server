import { UUIDProvider } from '../../providers/implementations/UUIDProvider';
import { TaskRepository } from '../../repositories/prisma/TaskRepository';
import { CreateTask } from './CreateTask';
import { CreateTaskController } from './CreateTaskController';

const taskRepository = new TaskRepository();
const uuidProvider = new UUIDProvider();

const createTask = new CreateTask(taskRepository, uuidProvider);
const createTaskController = new CreateTaskController(createTask);

export { createTaskController };
