import fs from "fs";

import algoliasearch, { SearchIndex } from "algoliasearch";
import git from "isomorphic-git";
import moment from "moment";
import idx, { INDEX } from "../index";

const log = require("debug")("algolia");

const AVERAGE_RECORD_SIZE = 172.65; // bytes

export interface AlgoliaObject {
  objectID: string;
  name: string;
  desc: string;
  repo: string | null;
  reg: string;
  vers: string;
  time: number;
  ref: string;
}

interface UploadMeta {
  time: number;
  ref: string;
}

type Patch = { [key: string]: string[] };

function objID(reg: string, name: string) {
  return `${reg}_${name}`;
}

async function createObject(
  reg: string,
  name: string,
  meta: UploadMeta
): Promise<AlgoliaObject> {
  const info = await idx.registry(reg).module(name);
  if (!info) return Promise.reject();
  const vers = info.latest;
  const { desc, repo } = info.versions[vers];
  const { time, ref } = meta;
  return {
    objectID: objID(reg, name),
    name,
    desc,
    repo,
    reg,
    time,
    vers,
    ref,
  };
}

async function checkChanges(
  index: SearchIndex,
  patch: Patch,
  meta: UploadMeta
): Promise<boolean> {
  const testreg = Object.keys(patch)[0]; // first registry
  const testname = Object.values(patch)[0][0]; // first object
  const testid = objID(testreg, testname);

  try {
    const record = await index.getObject<AlgoliaObject>(testid);
    if (record.ref === meta.ref) {
      log("patch already live, no changes, exiting...");
      return false;
    }
  } catch ({ status }) {
    if (status !== 404) {
      log("invalid algolia test (%d), exiting...", status);
      return false;
    }
  }
  return true;
}

export enum IndexingType {
  ALL,
  UPDATED,
}

async function algolia(type = IndexingType.UPDATED) {
  let patch: Patch = {};
  if (type === IndexingType.UPDATED) {
    for (const reg of idx.registries()) {
      patch[reg] = [...idx.registry(reg).new(), ...idx.registry(reg).updated()];
    }
  } else if (type === IndexingType.ALL) {
    patch = idx.all();
  }

  const count = Object.values(patch).reduce((a, b) => a + b.length, 0);
  if (count === 0) {
    log("no changes, exiting...");
    return;
  }

  log("processing %d registry entries...", count);

  const gitlog = await git.log({ fs, dir: INDEX });
  if (gitlog.length === 0) {
    log("invalid gitlog, exiting...");
    return;
  }

  const ref = gitlog[0].oid; // latest commit

  const time = moment().utc().unix();

  const meta: UploadMeta = {
    time, // unix timestamp
    ref,
  };

  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_KEY
  );

  const index = client.initIndex(process.env.ALGOLIA_INDEX);

  if (type != IndexingType.ALL) {
    const changes = await checkChanges(index, patch, meta);
    if (!changes) return;
  }

  const promises = [];
  for (const reg of idx.registries()) {
    for (const name of patch[reg]) {
      promises.push(createObject(reg, name, meta));
    }
  }

  const values = await Promise.allSettled<AlgoliaObject[]>(promises);

  const objects = [];

  for (const result of values) {
    if (result.status === "fulfilled") {
      objects.push(result.value);
    }
  }

  log("found %d valid entries!", objects.length);
  log("updating algolia index...");

  index.saveObjects(objects);

  log("done!");
}

export default algolia;
