import { usersRouter } from "@wos/server/src/routers/users";
import { router } from "@wos/server/src/utils/trpc";

export const appRouter = router({ users: usersRouter });

export type AppRouter = typeof appRouter;
