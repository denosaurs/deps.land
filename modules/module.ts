import {
  getVersionList,
  VersionInfo,
  VersionMetaInfo,
  getVersionMeta,
  getModules,
  SearchResult,
} from "./x";
import { getNestModule, ModuleNest } from "./nest";

export interface ModuleInfo {
  name: string;
  description: string;
  stars: number;
  version: VersionInfo;
}

export interface ModuleMeta {
  info: VersionMetaInfo;
}

export class Module {
  static async info(name: string): Promise<ModuleInfo | null> {
    const version = await getVersionList(name);
    const res = await getModules(1, 2, name);
    if (!version || !res || res.results.length === 0) return null;
    const mod = res.results.find((r) => r.name === name);
    if (!mod) return null;
    return {
      name,
      description: mod.description,
      stars: Number(mod.star_count),
      version,
    };
  }

  static async meta(name: string, version: string): Promise<ModuleMeta | null> {
    const data = await getVersionMeta(name, version);
    if (!data) return null;
    return {
      info: data,
    };
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
