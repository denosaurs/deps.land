import type { NextApiHandler } from "next";

import { Module } from "../../../../modules/module";
import { parseNameVersion } from "../../../../modules/x";

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let { rest } = req.query;

  let [name, version] = parseNameVersion(rest[0]);
  if (!version) {
    const info = await Module.version(name);
    if (!info) {
      res.status(404).json({ message: "Module not found." });
      return;
    }
    version = info.latest;
  }

  rest = rest.slice(1);
  if (Array.isArray(rest)) rest = rest.join("/");
  if (!rest.startsWith("/")) rest = `/${rest}`;

  let source = await Module.source(name, version, rest);

  if (!source) {
    // TODO(@qu4k): fix this problem upstream in bors
    source = await Module.source(name, `v${version}`, rest);
  }

  if (!source) {
    res.status(404).json({ message: "Module not found." });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  res.status(200).json({ source });
};

export default handler;
