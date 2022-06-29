type TaskStatus = 'pending' | 'in progress' | 'completed';

type TaskEntityProps = {
  id: string;
  title: string;
  startDate?: Date;
  deadline?: Date | null;
  status?: TaskStatus;
  details?: string | null;
  userId: string;
}

class TaskEntity {
  readonly id: string;
  readonly title: string;
  readonly startDate: Date;
  readonly deadline: Date | null;
  readonly status: TaskStatus;
  readonly details: string | null;
  readonly userId: string;

  constructor(taskProps: TaskEntityProps) {
    this.id = taskProps.id;
    this.title = taskProps.title;
    this.startDate = taskProps.startDate === undefined ? new Date() : taskProps.startDate;
    this.status = taskProps.status === undefined ? 'pending' : taskProps.status;
    this.userId = taskProps.userId;
    this.deadline = taskProps.deadline === undefined ? null : taskProps.deadline;
    this.details = taskProps.details === undefined ? null : taskProps.details;
  }
}

export { TaskEntity, TaskEntityProps, TaskStatus };
