import type { NextApiHandler } from "next";

import { Module } from "../../../../modules/module";
import { parseNameVersion } from "../../../../modules/x";

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let { rest = "std" } = req.query;
  if (Array.isArray(rest)) rest = rest.join("");

  const [name, version] = parseNameVersion(rest);

  let nest = await Module.nest(name);

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  res.status(200).json({ nest });
};

export default handler;
