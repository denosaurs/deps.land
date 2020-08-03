import { NowRequest, NowResponse } from "@vercel/node";
import fetch from "node-fetch";

const DENO_ENDPOINT = "https://api.deno.land/modules";

const LIMIT = 10;

export default async (request: NowRequest, response: NowResponse) => {
  let { module = "std" } = request.query;

  if (Array.isArray(module)) module = module.join("");

  const query = new URLSearchParams();
  query.append("limit", String(LIMIT));
  query.append("query", module);

  const res = await fetch(`${DENO_ENDPOINT}?${query.toString()}`);

  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=300, stale-while-revalidate"
  );
  response.status(200).send(`Hello ${name}!`);
};
