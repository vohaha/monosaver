import express from "express";
import { redisClient } from "../../redis";
import { fetchTransactions } from "../mono/api";
import { createRequestHandler } from "../../common/createRequestHandler";
import {
  getMonthRange,
  getStatementCacheKey,
  uitifyStatements,
} from "./helpers";
import { AppError } from "../../common/error";

export const statementsRouter = express.Router();

const REDIS_CACHE_KEY = "statement";
const REDIS_CACHE_EXPIRATION_TIME_SECONDS = 60;

statementsRouter.get(
  "/:accountId/:month/:year",
  createRequestHandler(async (req, res, next) => {
    const cache = await redisClient.get(
      getStatementCacheKey(req.path, REDIS_CACHE_KEY)
    );
    if (cache != null) {
      res.status(200).json(uitifyStatements(JSON.parse(cache)));
    } else {
      next();
    }
  }),
  createRequestHandler(async (req, res) => {
    const { month: requestedMonth, year: requestedYear } = req.params;
    if (isNaN(+requestedMonth) || isNaN(+requestedYear)) {
      throw new AppError("Invalid month or year", 400);
    }
    const [startOfRequestedMonth, endOfRequestedMonth] = getMonthRange(
      +requestedMonth,
      +requestedYear
    );
    const { data, status } = await fetchTransactions(
      req.params.accountId,
      startOfRequestedMonth,
      endOfRequestedMonth
    );
    if (status === 200) {
      res.status(status).send(uitifyStatements(data));

      await redisClient.setEx(
        getStatementCacheKey(req.path, REDIS_CACHE_KEY),
        REDIS_CACHE_EXPIRATION_TIME_SECONDS,
        JSON.stringify(data)
      );
    }
  })
);
