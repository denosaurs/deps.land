import type { NextApiHandler } from "next";

import { Module } from "../../../../modules/module";
import { parseNameVersion } from "../../../../modules/x";

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let { rest = "std" } = req.query;
  if (Array.isArray(rest)) rest = rest.join("");

  let [name, version] = parseNameVersion(rest);
  if (!version) {
    const info = await Module.version(name);
    if (!info) {
      res.status(404).json({ message: "Module not found." });
      return;
    }
    version = info.latest;
  }

  let mod = await Module.meta(name, version);

  if (!mod) {
    res.status(404).json({ message: "Module not found." });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  res.status(200).json(mod);
};

export default handler;
