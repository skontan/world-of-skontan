import { router, publicProcedure } from "@wos/server/src/utils/trpc";
import { z } from "zod";

export const usersRouter = router({
  hello: publicProcedure.query(async () => {
    const message = "hello world (of skontan)";
    console.log({ message });
    return { message };
  }),
  addUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;
      const user = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return user;
    }),
});
