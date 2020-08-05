import type { NextApiHandler } from "next";

import { Modules } from "../../modules/module";

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let count = await Modules.count();

  if (!count) {
    res.status(200).json({ number: -404 });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  res.status(200).json({ number: count });
};

export default handler;
