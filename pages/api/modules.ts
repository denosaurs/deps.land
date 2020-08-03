import { NowRequest, NowResponse } from "@vercel/node";
import fetch from "node-fetch";

const DENO_ENDPOINT = "https://api.deno.land/modules";

export default (request: NowRequest, response: NowResponse) => {
  const { query = undefined } = request.query;

  response.setHeader(
    "Cache-Control",
    "max-age=0, s-maxage=300, stale-while-revalidate"
  );
  response.status(200).send(`Hello ${name}!`);
};
