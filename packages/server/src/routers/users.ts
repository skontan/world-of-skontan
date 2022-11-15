import { router, publicProcedure } from "@wos/server/src/utils/trpc";
import { z } from "zod";
import axios from "axios";
import * as jsdom from "jsdom";

export const usersRouter = router({
  hello: publicProcedure.query(async () => {
    const message = "hello world (of skontan)";

    const fetchWebsite = async () => {
      const res = await axios.get("http://www.saob.se/");
      const dom = new jsdom.JSDOM(res.data);

      const elements = dom.window.document.getElementsByClassName("dagens");
      console.log(elements[0].getElementsByTagName("a")[0].textContent);
    };

    fetchWebsite();
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
