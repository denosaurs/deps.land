const path = require("path");
const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");
const fs = require("fs");

const INDEX_REPO = "https://github.com/denosaurs/deps.index.git";
const AUTHOR = { name: "deps.land" };

const dir = path.join(process.cwd(), "deps.index");
if (!fs.existsSync(dir)) {
  git
    .clone({
      fs,
      http,
      dir,
      url: INDEX_REPO,
    })
    .then(console.log("[index] cloned"));
} else {
  git
    .pull({
      fs,
      http,
      dir,
      singleBranch: true,
      author: AUTHOR,
    })
    .then(console.log("[index] updated (pull)"));
}
