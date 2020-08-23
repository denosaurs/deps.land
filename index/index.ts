import fs from "fs";
import path from "path";
import glob from "glob";
import readline from "readline";

export interface VersionInfo {
  name: string;
  desc: string;
  vers: string;
  repo: string | null;
}

export interface ModuleInfo {
  latest: string;
  versions: {
    [key: string]: VersionInfo;
  };
}

export interface IndexInfo {
  total: number;
  registries: string[];
}

interface Registry {
  module: (name: string) => Promise<ModuleInfo>;
  modules: () => string[];
  new: () => string[];
  updated: () => string[];
  info: () => RegistryInfo;
}

interface RegistryInfo {
  raw_url: string;
}

export const INDEX = path.join(process.cwd(), "deps.index");

function registries(): string[] {
  return fs
    .readdirSync(INDEX, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((dirent) => !dirent.startsWith("."));
}

function registry(reg: string): Registry {
  return {
    module: (name: string) => module(reg, name),
    modules: () => modules(reg),
    new: () => feed(reg, "new"),
    updated: () => feed(reg, "updated"),
    info: () => registryInfo(reg),
  };
}

function feed(reg: string, type: "updated" | "new") {
  const manifest = path.join(INDEX, reg, `${type}.json`);
  if (!fs.existsSync(manifest)) return null;
  const data = JSON.parse(fs.readFileSync(manifest, "utf-8")) as {
    name: string;
  }[];
  const names = data.map((_) => _.name);
  return names;
}

function registryInfo(reg: string): RegistryInfo {
  const manifest = path.join(INDEX, reg, "registry.json");
  if (!fs.existsSync(manifest)) return null;
  const data = JSON.parse(fs.readFileSync(manifest, "utf-8")) as RegistryInfo;
  return data;
}

async function module(
  registry: string,
  name: string
): Promise<ModuleInfo | null> {
  let rel: string;
  switch (name.length) {
    case 0:
      return null;
    case 1:
      rel = "1";
      break;
    case 2:
      rel = "2";
      break;
    case 3:
      rel = path.join("3", name.substr(0, 1));
      break;
    default:
      rel = path.join(name.substring(0, 2), name.substring(2, 4));
  }
  rel = path.join(registry, rel, name);
  const mod = path.join(INDEX, rel);

  if (!fs.existsSync(mod)) return null;

  try {
    const stream = fs.createReadStream(mod);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    const versions: VersionInfo[] = [];
    for await (const line of rl) {
      versions.push(JSON.parse(line));
    }
    return {
      latest: versions.slice(-1)[0].vers,
      versions: Object.fromEntries(versions.map((mod) => [mod.vers, mod])),
    };
  } catch {
    return null;
  }
}

function modules(reg: string): string[] {
  const pt1 = `${reg}/*/*/*`;
  const pt2 = `${reg}/[12]/*`;
  let ar1 = glob
    .sync(pt1, { cwd: INDEX, dot: false, realpath: true })
    .map((_) => path.basename(_));
  let ar2 = glob
    .sync(pt2, { cwd: INDEX, dot: false, realpath: true })
    .map((_) => path.basename(_));
  return [...ar1, ...ar2];
}

function all(): { [key: string]: string[] } {
  let res = {};
  for (let reg of registries()) {
    res[reg] = modules(reg);
  }
  return res;
}

function count(): number {
  let res = 0;
  for (let reg of registries()) {
    res += modules(reg).length;
  }
  return res;
}

function info(): IndexInfo {
  return {
    total: count(),
    registries: registries(),
  };
}

export default {
  registries,
  registry,
  all,
  count,
  info,
};
