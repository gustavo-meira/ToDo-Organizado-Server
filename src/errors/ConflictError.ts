import { HttpError } from './HttpError';

class ConflictError extends HttpError {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
  }
}

export { ConflictError };
