import type { NextApiHandler } from "next";
import { Module } from "../../../../modules/module";

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let { module = "std" } = req.query;
  if (Array.isArray(module)) module = module.join("");

  let version = undefined;
  if (module.includes("@")) {
    const split = module.split("@");
    module = split[0];
    version = split[1];
  } else {
    const info = await Module.info(module);
    if (!info) {
      res.status(404).json({ message: "Module not found." });
      return;
    }
    version = info.version.latest;
  }

  let mod = await Module.meta(module, version);

  if (!mod) {
    res.status(404).json({ message: "Module not found." });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  res.status(200).json(mod);
};

export default handler;
