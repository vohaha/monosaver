import { RequestHandler } from "express";

export const authMiddleware: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
};
