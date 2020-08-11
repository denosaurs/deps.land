import fs from "fs";
import path from "path";
import glob from "glob";
import mem from "mem";

export const INDEX = path.join(process.cwd(), "deps.index");

function registriesMem(): string[] {
  return fs
    .readdirSync(INDEX, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((dirent) => !dirent.startsWith("."));
}

export const registries = mem(registriesMem);

export function mod(registry: string, name: string): string | null {
  let rel;
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
  return mod;
}

function modsMem(registry: string): string[] {
  const pt1 = `${registry}/*/*/*`;
  const pt2 = `${registry}/[12]/*`;
  let ar1 = glob.sync(pt1, { cwd: INDEX, dot: false, realpath: true });
  let ar2 = glob.sync(pt2, { cwd: INDEX, dot: false, realpath: true });
  return [...ar1, ...ar2];
}

export const mods = mem(modsMem);

function allMem(): string[] {
  let res = [];
  for (let reg of registries()) {
    res = [...res, ...mods(reg)];
  }
  return res;
}

export const all = mem(allMem);

export interface IndexInfo {
  total: number;
  registries: string[];
}

function infoMem(): IndexInfo {
  return {
    total: all().length,
    registries: registries(),
  };
}

export const info = mem(infoMem);
