import express from "express";
import { redisClient } from "../../redis";
import { fetchClientInfo } from "../mono/api";
import { createRequestHandler } from "../../common/createRequestHandler";

export const clientInfoRouter = express.Router();

const REDIS_CACHE_KEY = "clientInfo";

clientInfoRouter.get(
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
      delete data.accounts;
      delete data.jars;
      await redisClient.setEx(REDIS_CACHE_KEY, 60, JSON.stringify(data));
      res.status(status).send(data);
    }
  })
);
