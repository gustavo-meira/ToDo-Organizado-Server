abstract class HttpError extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
  }
}

export { HttpError };
