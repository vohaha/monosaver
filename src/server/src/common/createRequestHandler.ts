import { AxiosError } from "axios";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./error";

export function createRequestHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        let customErrorMessage;
        let customErrorStatus;
        if (error instanceof AppError) {
          customErrorMessage = error.message;
          customErrorStatus = error.status;
        }
        res
          .status(customErrorStatus || 500)
          .send({ errorDescription: customErrorMessage || "Internal error!" });
        return;
      }
      if (error?.response) {
        res.status(error.response.status).send(error.response.data);
      } else if (error.request) {
        res.status(500).send("External error!");
      } else {
      }
    }
  };
}
