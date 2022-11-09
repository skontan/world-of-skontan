import type { AppRouter } from "@wos/server/src/routers";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
