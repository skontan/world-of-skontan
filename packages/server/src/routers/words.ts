import { router, publicProcedure } from "@wos/server/src/utils/trpc";
import { z } from "zod";
import axios from "axios";
import * as jsdom from "jsdom";

export const wordsRouter = router({
  wordOfDay: publicProcedure.query(async () => {
    const res = await axios.get("http://www.saob.se/");
    const dom = new jsdom.JSDOM(res.data);

    const elements = dom.window.document.getElementsByClassName("dagens");
    const aTag = elements[0].getElementsByTagName("a")[0];
    const wordOfDay = aTag.textContent;
    const href = aTag.getAttribute("href");
    const fullHref = `https://saob.se${href}`;

    return { wordOfDay, href: fullHref };
  }),
});
