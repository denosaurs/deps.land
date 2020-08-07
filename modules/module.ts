import {
  getVersionList,
  VersionInfo,
  VersionMetaInfo,
  getVersionMeta,
  getModules,
  SearchResult,
  getSourceURL,
} from "./x";
import { getNestModule, ModuleNest } from "./nest";

export interface ModuleInfo {
  name: string;
  description: string;
  stars: number;
}

export interface ModuleMeta {
  info: VersionMetaInfo;
}

export interface ModuleRegistries {
  nest: ModuleNest;
}

export class Module {
  static async info(name: string): Promise<ModuleInfo | null> {
    const res = await getModules(1, 2, name);
    if (!res || res.results.length === 0) return null;
    const mod = res.results.find((r) => r.name === name);
    if (!mod) return null;
    return {
      name,
      description: mod.description,
      stars: Number(mod.star_count),
    };
  }

  static async version(name: string): Promise<VersionInfo | null> {
    return await getVersionList(name);
  }

  static async meta(name: string, version: string): Promise<ModuleMeta | null> {
    const data = await getVersionMeta(name, version);
    if (!data) return null;
    return {
      info: data,
    };
  }

  static async source(
    name: string,
    version: string,
    path: string
  ): Promise<string | null> {
    const url = getSourceURL(name, version, path);
    const res = await fetch(url);
    if (res.status === 403 || res.status === 404) return null;
    if (res.status !== 200) {
      throw Error(
        `Got an error (${
          res.status
        }) while getting the soruce file:\n${await res.text()}`
      );
    }
    const source = await res.text();
    if (!source) return null;
    return source;
  }

  static async nest(name: string): Promise<ModuleNest | null> {
    return await getNestModule(name);
  }
}

export interface ModulesQuery {
  results: SearchResult[];
  totalCount: number;
}

export class Modules {
  static async count(): Promise<number | null> {
    const res = await getModules(1, 1, "");
    if (res.results.length === 0) return null;
    return res.totalCount;
  }
  static async query(
    page: number,
    limit: number,
    query: string
  ): Promise<ModulesQuery | null> {
    const res = await getModules(page, limit, query);
    if (res.results.length === 0) return null;
    return res;
  }
}
