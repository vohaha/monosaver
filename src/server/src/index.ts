import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { accountsRouter } from "./modules/accounts/router";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { connectRedis } from "./redis";
import { clientInfoRouter } from "./modules/clientInfo/router";
import { createRequestHandler } from "./common/createRequestHandler";

/*
 * Global configs
 * */
dotenv.config();
void connectRedis();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/v1/accounts", accountsRouter);
app.use("/api/v1/client-info", clientInfoRouter);

app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
