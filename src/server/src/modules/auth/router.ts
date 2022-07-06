import express from "express";
import { userService } from "../users/service";
import { issueJWT, validatePassword } from "./helpers";
import { createHttpErrorPayload } from "../../common/errors";
import { createRequestHandler } from "../../common/createRequestHandler";
import { AuthConfig } from "./type";

export const authRouter = express.Router();

function createValidAuthResponse({ token }: AuthConfig) {
  return { token };
}

authRouter.post(
  "/login",
  createRequestHandler(async (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    const wrongCredErrorPayload = createHttpErrorPayload({
      error: "Wrong credentials",
    });
    const user = await userService.findUserByEmail(email);
    if (user == null) {
      return res.status(400).json(wrongCredErrorPayload);
    }
    const isValid = validatePassword(password, user.password_hash, user.salt);
    if (!isValid) {
      return res.status(400).json(wrongCredErrorPayload);
    }
    const tokenData = issueJWT(user);
    return res.status(200).json(createValidAuthResponse(tokenData));
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
    const tokenData = issueJWT(user);
    res.status(201).send(createValidAuthResponse(tokenData));
  })
);
