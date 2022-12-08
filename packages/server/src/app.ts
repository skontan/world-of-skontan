import path from "path";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import customConfig from "./config/default";
import connectDB from "./utils/prisma";
import { createContext } from "@wos/server/src/utils/trpc";
import { appRouter } from "@wos/server/src/routers";

dotenv.config({ path: path.join(__dirname, "./.env") });

const app = express();
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));


app.use(
  cors({
    origin: [customConfig.origin],
    credentials: true,
  })
);
app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = customConfig.port;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
  console.log(customConfig.origin);


  connectDB();
});
