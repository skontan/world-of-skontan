import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { prisma } from "@wos/server/src/utils/prisma";
import { initTRPC } from "@trpc/server";

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  return {
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware;

export const mergeRouters = t.mergeRouters;
