import { usersRouter } from "@wos/server/src/routers/users";
import { createRouter } from "@wos/server/src/utils/trpc";

export const appRouter = createRouter().merge("users.", usersRouter);

export type AppRouter = typeof appRouter;
