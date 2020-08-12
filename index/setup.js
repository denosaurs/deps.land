const path = require("path");
const fs = require("fs");
const log = require("debug")("git-index");
const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");

const INDEX_REPO = "https://github.com/denosaurs/deps.index.git";
const AUTHOR = { name: "deps.land" };
const dir = path.join(process.cwd(), "deps.index");

async function main() {
  log("initializing...");
  if (!fs.existsSync(dir)) {
    log("cloning index...");
    await git.clone({
      fs,
      http,
      dir,
      url: INDEX_REPO,
    });
    log("cloning done!");
  } else {
    log("updating index...");
    await git.pull({
      fs,
      http,
      dir,
      singleBranch: true,
      author: AUTHOR,
    });
    log("updating done!");
  }
}

main();
