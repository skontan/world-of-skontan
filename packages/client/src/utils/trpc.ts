import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@wos/server/src/routers";

export const trpc = createReactQueryHooks<AppRouter>();
