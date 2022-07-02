import express from "express";
import { redisClient } from "../../redis";
import { fetchClientInfo } from "../mono/api";
import { clientifyAccount } from "./helpers";
import { createRequestHandler } from "../../common/createRequestHandler";

export const accountsRouter = express.Router();

const REDIS_CACHE_KEY = "accounts";

accountsRouter.get(
  "/",
  createRequestHandler(async (req, res, next) => {
    const cache = await redisClient.get(REDIS_CACHE_KEY);
    if (cache != null) {
      res.status(200).json(JSON.parse(cache));
    } else {
      next();
    }
  }),
  createRequestHandler(async (req, res) => {
    const { data, status } = await fetchClientInfo();
    if (status === 200) {
      data.accounts = data.accounts.map(clientifyAccount(data.clientId));
      await redisClient.setEx(
        REDIS_CACHE_KEY,
        60,
        JSON.stringify(data.accounts)
      );
      res.status(status).send(data.accounts);
    }
  })
);
