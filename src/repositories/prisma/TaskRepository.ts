import { PrismaClient } from '@prisma/client';
import { TaskEntity, TaskStatus } from '../../entities/TaskEntity';
import { NotFoundError } from '../../errors/NotFoundError';
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

  async update(task: TaskEntity): Promise<void> {
    await this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        title: task.title,
        details: task.details,
        deadline: task.deadline,
        startDate: task.startDate,
        status: task.status,
      },
    });
  }

  async updateStatus(taskId: string, status: TaskStatus): Promise<void> {
    await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status,
      },
    });
  }

  async getById(id: string): Promise<TaskEntity> {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
      },
    });

    if (!task) {
      throw new NotFoundError('"task" not found');
    }

    return new TaskEntity({
      id: task.id,
      title: task.title,
      details: task.details,
      userId: task.userId,
      deadline: task.deadline,
      startDate: task.startDate,
      status: task.status as TaskStatus,
    });
  }
}

export { TaskRepository };
