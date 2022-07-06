import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { accountsRouter } from "./modules/accounts/router";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { connectRedis } from "./redis";
import { clientInfoRouter } from "./modules/clientInfo/router";
import { statementsRouter } from "./modules/statements/router";
import { authRouter } from "./modules/auth/router";
import passport from "passport";
import { configurePassport } from "./modules/auth/passport";

/*
 * Global configs
 * */
dotenv.config();
void connectRedis();

/**
 * App Variables
 */
if (!process.env.PORT || !process.env.CLIENT_ORIGIN) {
  process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
const app = express();

/**
 *  App Configuration
 */
export const protectedRouter = express.Router();
protectedRouter.use("/v1/accounts", accountsRouter);
protectedRouter.use("/v1/client-info", clientInfoRouter);
protectedRouter.use("/v1/statements", statementsRouter);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  })
);

configurePassport(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/api",
  passport.authenticate("jwt", { session: false }),
  protectedRouter
);
app.use("/auth", authRouter);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
