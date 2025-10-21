// src/lib/errors/AppError.ts

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number, // optional HTTP status code or severity
  ) {
    super(message);
    this.name = "AppError";
  }
}
