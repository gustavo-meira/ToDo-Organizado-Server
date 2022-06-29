import { PrismaClient } from '@prisma/client';
import { TaskEntity, TaskStatus } from '../../entities/TaskEntity';
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

  async getAll(userId: string): Promise<TaskEntity[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId,
      },
    });

    return tasks.map((task) => new TaskEntity({
      id: task.id,
      title: task.title,
      details: task.details,
      userId: task.userId,
      deadline: task.deadline,
      startDate: task.startDate,
      status: task.status as TaskStatus,
    }));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}

export { TaskRepository };
