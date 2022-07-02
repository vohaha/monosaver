import express from "express";
import { redisClient } from "../../redis";
import { fetchClientInfo } from "../mono/api";
import { clientifyAccount } from "./helpers";
import { AxiosError } from "axios";

export const accountsRouter = express.Router();

const REDIS_CACHE_KEY = "accounts";

accountsRouter.get(
  "/",
  async (req, res, next) => {
    const cache = await redisClient.get(REDIS_CACHE_KEY);
    if (cache != null) {
      res.status(200).json(JSON.parse(cache));
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
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
    } catch (error) {
      if (!(error instanceof AxiosError)) {
        res.status(500).send("Internal error!");
        return;
      }
      if (error?.response) {
        res.status(error.response.status).send(error.response.data);
      } else if (error.request) {
        res.status(500).send("External error!");
      } else {
      }
    }
  }
);
