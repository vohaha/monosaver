import express from "express";
import { userService } from "../users/service";
import { createHttpErrorPayload } from "../../common/errors";
import { createRequestHandler } from "../../common/createRequestHandler";
import passport from "passport";
import { authMiddleware } from "./middlewares";

export const authRouter = express.Router();

authRouter.post(
  "/login",
  passport.authenticate("local"),
  createRequestHandler(async (req, res) => {
    res.sendStatus(200);
  })
);

authRouter.post(
  "/signup",
  createRequestHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.create({ email, password });
    if (user == null) {
      return res
        .status(400)
        .json(createHttpErrorPayload({ error: "Wrong credentials" }));
    }
    res.sendStatus(201);
  })
);

authRouter.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

authRouter.get("/verify", authMiddleware, (req, res) => {
  res.sendStatus(200);
});
