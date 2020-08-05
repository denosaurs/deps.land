import type { NextApiHandler } from "next";

import { Modules } from "../../modules/module";

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  let { query = "std", max = "10", page = "1" } = req.query;
  if (Array.isArray(query)) query = query.join("");
  if (Array.isArray(max)) max = max.join("");
  if (Array.isArray(page)) page = page.join("");

  const maxN = parseInt(max);
  if (isNaN(maxN)) {
    res.status(400).json({ message: "Max is NaN." });
    return;
  }

  const pageN = parseInt(page);
  if (isNaN(pageN)) {
    res.status(400).json({ message: "Page is NaN." });
    return;
  }

  let mod = await Modules.query(pageN, maxN, query);

  if (!mod) {
    res.status(404).json({ message: "Module not found." });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
  res.status(200).json(mod);
};

export default handler;
