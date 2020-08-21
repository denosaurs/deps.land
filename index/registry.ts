import fs from "fs";
import path from "path";
import glob from "glob";
import readline from "readline";

export const INDEX = path.join(process.cwd(), "deps.index");

export function registries(): string[] {
  return fs
    .readdirSync(INDEX, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((dirent) => !dirent.startsWith("."));
}

export interface VersionInfo {
  name: string;
  desc: string;
  repo: string;
  vers: string;
}

export interface ModuleInfo {
  latest: string;
  versions: {
    [key: string]: VersionInfo;
  };
}

export async function module(
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

export function modules(registry: string): string[] {
  const pt1 = `${registry}/*/*/*`;
  const pt2 = `${registry}/[12]/*`;
  let ar1 = glob.sync(pt1, { cwd: INDEX, dot: false, realpath: true });
  let ar2 = glob.sync(pt2, { cwd: INDEX, dot: false, realpath: true });
  return [...ar1, ...ar2];
}

export function all(): string[] {
  let res = [];
  for (let reg of registries()) {
    res = [...res, ...modules(reg)];
  }
  return res;
}

export interface IndexInfo {
  total: number;
  registries: string[];
}

export function info(): IndexInfo {
  return {
    total: all().length,
    registries: registries(),
  };
}

export default {
  registries,
  module,
  modules,
  all,
  info,
};
