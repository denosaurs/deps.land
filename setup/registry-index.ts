import fs from "fs";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

import { INDEX } from "../index";

const INDEX_REPO = "https://github.com/denosaurs/deps.index.git";
const AUTHOR = { name: "deps.land" };

const log = require("debug")("git-index");

async function index() {
  log("initializing...");
  if (!fs.existsSync(INDEX)) {
    log("cloning index...");
    await git.clone({
      fs,
      http,
      dir: INDEX,
      url: INDEX_REPO,
    });
  } else {
    log("updating index...");
    await git.pull({
      fs,
      http,
      dir: INDEX,
      singleBranch: true,
      author: AUTHOR,
    });
  }
  log("done!");
}

export default index;
