import { HttpError } from './HttpError';

class UnauthorizedError extends HttpError {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export { UnauthorizedError };
