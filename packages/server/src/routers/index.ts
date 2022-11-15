import { usersRouter } from "@wos/server/src/routers/users";
import { wordsRouter } from "@wos/server/src/routers/words";
import { router } from "@wos/server/src/utils/trpc";

export const appRouter = router({ users: usersRouter, words: wordsRouter });

export type AppRouter = typeof appRouter;
