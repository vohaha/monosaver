import { AxiosError } from "axios";
import { Request, Response, NextFunction } from "express";

export function createRequestHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        res.status(500).send({ errorDescription: "Internal error!" });
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
