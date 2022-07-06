export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "AppError";
    this.status = status;
  }
}

export function createHttpErrorPayload(input: { error: string }) {
  const error = input.error || "Internal Server Error";
  return {
    error,
  };
}
