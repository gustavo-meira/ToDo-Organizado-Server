import { HttpError } from './HttpError';

class BadRequestError extends HttpError {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export { BadRequestError };
