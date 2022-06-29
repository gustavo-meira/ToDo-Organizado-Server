import { PrismaClient } from '@prisma/client';
import { TaskEntity } from '../../entities/TaskEntity';
import { ITaskRepository } from '../ITaskRepository';

class TaskRepository implements ITaskRepository {
  private prisma = new PrismaClient();

  async create(task: TaskEntity): Promise<void> {
    await this.prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        details: task.details,
        userId: task.userId,
        deadline: task.deadline,
        startDate: task.startDate,
        status: task.status,
      },
    });
  }
}

export { TaskRepository };
