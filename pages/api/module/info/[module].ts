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
  }

  let mod = await Module.info(module);

  if (!mod) {
    res.status(404).json({ message: "Module not found." });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  res.status(200).json(mod);
};

export default handler;
