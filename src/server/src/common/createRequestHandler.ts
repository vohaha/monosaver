import { AxiosError } from "axios";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { HttpError } from "./errors";

export function createRequestHandler(fn: RequestHandler): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        let customErrorMessage;
        let customErrorStatus;
        if (error instanceof HttpError) {
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
        return;
      } else {
        res.status(500).send("External error!");
        return;
      }
    }
  };
}
