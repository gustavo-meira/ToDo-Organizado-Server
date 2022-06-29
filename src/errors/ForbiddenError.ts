import { HttpError } from './HttpError';

class ForbiddenError extends HttpError {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 403;
  }
}

export { ForbiddenError };
