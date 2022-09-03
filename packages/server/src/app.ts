import path from "path";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import customConfig from "./config/default";
import connectDB, { prisma } from "./utils/prisma";
import { z } from "zod";

dotenv.config({ path: path.join(__dirname, "./.env") });

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

function createRouter() {
  return trpc.router<Context>();
}

const appRouter = createRouter()
  .query("hello", {
    resolve: async () => {
      const message = "hello world (of skontan)";
      console.log({ message });
      return { message };
    },
  })
  .mutation("add_user", {
    input: z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { name, email, password } = input;
      const user = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return user;
    },
  });

export type AppRouter = typeof appRouter;

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

  connectDB();
});
