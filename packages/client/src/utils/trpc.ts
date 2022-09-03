import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@wos/server";

export const trpc = createReactQueryHooks<AppRouter>();
