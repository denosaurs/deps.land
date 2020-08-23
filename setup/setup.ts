import dotenv from "dotenv";
import readline from "readline";

dotenv.config({
  path: ".env.local",
});

import index from "./registry-index";
import algolia, { IndexingType } from "./algolia-search";

const log = require("debug")("setup");

async function light(): Promise<void> {
  await index();
  await algolia(IndexingType.UPDATED);
}

async function full(): Promise<void> {
  await index();
  await algolia(IndexingType.ALL);
}

async function dev(): Promise<void> {
  await index();
}

async function setup(): Promise<void> {
  if (process.argv.includes("FULL")) {
    log("starting full setup...");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("This is **very** expensive, continue? [y/N] > ", (res) => {
      if (res.toLowerCase() === "y") {
        full();
      }
      rl.close();
    });
  } else if (process.argv.includes("DEV")) {
    log("starting dev setup...");
    await dev();
  } else {
    log("starting light setup...");
    await light();
  }
}

setup();
