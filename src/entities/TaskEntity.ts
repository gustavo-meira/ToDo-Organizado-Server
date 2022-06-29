type TaskStatus = 'pending' | 'in progress' | 'completed';

type TaskEntityProps = {
  id: string;
  title: string;
  startDate?: Date;
  deadline?: Date;
  status?: TaskStatus;
  details?: string;
  userId: string;
}

class TaskEntity {
  private _id: string;
  private _title: string;
  private _startDate: Date;
  private _deadline: Date | null;
  private _status: TaskStatus;
  private _details: string | null;
  private _userId: string;

  constructor(taskProps: TaskEntityProps) {
    this._id = taskProps.id;
    this._title = taskProps.title;
    this._startDate = taskProps.startDate === undefined ? new Date() : taskProps.startDate;
    this._status = taskProps.status === undefined ? 'pending' : taskProps.status;
    this._userId = taskProps.userId;
    this._deadline = taskProps.deadline === undefined ? null : taskProps.deadline;
    this._details = taskProps.details === undefined ? null : taskProps.details;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get deadline(): Date | null {
    return this._deadline;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get details(): string | null {
    return this._details;
  }

  get userId(): string {
    return this._userId;
  }
}

export { TaskEntity, TaskEntityProps, TaskStatus };
