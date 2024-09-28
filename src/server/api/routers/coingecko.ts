import { z } from "zod";

import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type TokenListResponse, type TokenDetailResponse } from "~/types/coingecko";

export const coingeckoRouter = createTRPCRouter({
  getTokenById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${input.id}`);
      const json = (await res.json()) as TokenDetailResponse;
      return json;
    }),
  getTokens: publicProcedure
    .input(z.object({ category: z.string().optional(), sparkline: z.boolean().optional() }))
    .query(async ({ input }) => {
      try {
        const params = new URLSearchParams({
          vs_currency: "usd",
          category: input.category ?? "base-meme-coins",
          sparkline: (input.sparkline ?? true).toString(),
          x_cg_demo_api_key: env.COINGECKO_API_KEY,
        });
        const url = `https://api.coingecko.com/api/v3/coins/markets?${params.toString()}`;

        const res = await fetch(url, {
          headers: {
            accept: "application/json",
          },
        });
        const json = (await res.json()) as TokenListResponse[];
        return json;
      } catch (e) {
        console.error(e);
        return [];
      }
    }),
  getTokenByIdQuery: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${input.id}`);
      const json = (await res.json()) as TokenDetailResponse;
      return json;
    }),
});