import type { NextApiHandler } from "next";
import { Module } from "../../../../modules/module";

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let { path } = req.query;

  let module = path[0];
  let version = undefined;
  if (module.includes("@")) {
    const split = module.split("@");
    module = split[0];
    version = split[1];
  } else {
    const info = await Module.version(module);
    if (!info) {
      res.status(404).json({ message: "Module not found." });
      return;
    }
    version = info.latest;
  }

  path = path.slice(1);
  if (Array.isArray(path)) path = path.join("/");
  if (!path.startsWith("/")) path = `/${path}`;

  let source = await Module.source(module, version, path);

  if (!source) {
    res.status(404).json({ message: "Module not found." });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  res.status(200).json({ source });
};

export default handler;
