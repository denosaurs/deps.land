const API_ENDPOINT = "https://x.nest.land/api/";

export interface ModuleNest {
  name: string;
  normalizedName: string;
  owner: string;
  description?: string;
  repository?: string;
  latestVersion?: string;
  latestStableVersion?: string;
  locked: null;
  malicious: null;
  unlisted: false;
  updatedAt: Date;
  createdAt: Date;
}

export async function getNestModule(
  module: string
): Promise<ModuleNest | null> {
  const url = `${API_ENDPOINT}package/${module}`;
  const res = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });
  if (res.status === 403 || res.status === 404) return null;
  if (res.status !== 200) {
    throw Error(
      `Got an error (${
        res.status
      }) while getting the module from nest.land:\n${await res.text()}`
    );
  }
  return await res.json();
}
