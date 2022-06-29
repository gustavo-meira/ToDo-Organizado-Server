import { HttpError } from './HttpError';

class NotFoundError extends HttpError {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export { NotFoundError };
