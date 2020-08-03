import {
  getVersionList,
  VersionInfo,
  VersionMetaInfo,
  getVersionMeta,
  getModules,
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
    const res = await getModules(1, 1, name);
    if (!version || !res || res.results.length === 0) return null;
    const mod = res.results[0];
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

  static async registries(name: string): Promise<ModuleNest | null> {
    return await getNestModule(name);
  }
}

export class Modules {
  static async cound(): Promise<number | null> {
    const res = await getModules(1, 1, "");
    if (res.results.length === 0) return null;
    return res.totalCount;
  }
}
