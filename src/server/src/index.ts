import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import { accountsRouter } from "./modules/accounts/router";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { connectRedis } from "./redis";
import { clientInfoRouter } from "./modules/clientInfo/router";
import { statementsRouter } from "./modules/statements/router";
import { configurePassport } from "./modules/auth/passport";
import { authMiddleware } from "./modules/auth/middlewares";
import { authRouter } from "./modules/auth/router";

/*
 * Global configs
 * */
dotenv.config();
void connectRedis();

/**
 * App Variables
 */
if (
  !process.env.PORT ||
  !process.env.CLIENT_ORIGIN ||
  !process.env.SESSION_SECRET
) {
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
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    },
  })
);

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", authMiddleware, protectedRouter);
app.use("/auth", authRouter);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
