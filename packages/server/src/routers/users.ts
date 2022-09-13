import { createRouter } from "@wos/server/src/utils/trpc";
import { z } from "zod";

export const usersRouter = createRouter()
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
