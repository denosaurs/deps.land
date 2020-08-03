import type { NextApiHandler } from "next";
import { Modules } from "../../modules/module";

const handler: NextApiHandler = async (req, res) => {
  let count = await Modules.cound();

  res.setHeader("Content-Type", "application/json");

  if (!count) {
    res.status(200).json({ number: -404 });
    return;
  }

  res.status(200).json({ number: count });
};

export default handler;
