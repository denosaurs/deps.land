import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";

import Header, { HeaderLinks } from "~/components/sections/Header";
import Layout from "~/components/layout/Layout";
import Main from "~/components/sections/Main";
import Markdown from "~/components/markdown/Markdown";

import { ModuleInfo, ModuleMeta, ModuleRegistries } from "~/modules/module";
import { fetcher } from "~/pages/_app";
import { useMemo, useEffect } from "react";
import { parseNameVersion, getSourceURL, VersionInfo } from "~/modules/x";

function Module() {
  const router = useRouter();

  const { name, version, path, id } = useMemo(() => {
    const [identifier, ...pathParts] = (router.query.rest as string[]) ?? [];
    const path = pathParts.length === 0 ? "" : `/${pathParts.join("/")}`;
    const [name, version] = parseNameVersion(identifier ?? "");
    return { name, version, path, id: `${name}@${version}` };
  }, [router.query]);

  function gotoVersion(v: string, replace?: boolean) {
    const href = "/x/[...rest]";
    const as = `/x/${name}@${v}${path}`;
    console.log(v);
    replace ? router.replace(href, as) : router.push(href, as);
  }

  const { data: versionInfo } = useSWR<VersionInfo>(
    name ? `/api/module/version/${name}` : null,
    fetcher
  );

  const { data: meta } = useSWR<ModuleMeta>(
    name ? `/api/module/meta/${name}` : null,
    fetcher
  );

  const { data: info } = useSWR<ModuleInfo>(
    name ? `/api/module/info/${name}` : null,
    fetcher
  );
  const { data: registries } = useSWR<ModuleRegistries>(
    name ? `/api/module/registries/${name}` : null,
    fetcher
  );
  const { data: readme } = useSWR(
    name ? `/api/module/source/${name}/README.md` : null,
    fetcher
  );

  const canonicalPath = useMemo(() => `/x/${id}${path}`, [name, version, path]);
  const sourceURL = useMemo(() => getSourceURL(name, version, path), [
    name,
    version,
    path,
  ]);

  useEffect(() => {
    if (!version && versionInfo && versionInfo.latest) {
      gotoVersion(versionInfo.latest, true);
    }
  }, [versionInfo, version]);

  const links: HeaderLinks = {};
  if (name) {
    links[name] = (
      <Link href="/x/[...rest]" as={`/x/${id}`}>
        <a>{name}</a>
      </Link>
    );

    links["deno.land"] = <a href={`https://deno.land/x/${id}`}>deno.land/x/</a>;

    if (registries) {
      if (registries.nest) {
        links["nest.land"] = (
          <a href={`https://x.nest.land/${id}`}>x.nest.land</a>
        );
      }
    }

    if (meta) {
      const repo = meta.info.uploadOptions.repository;
      links["github"] = <a href={`https://github.com/${repo}`}>GitHub</a>;
    }
  }

  return (
    <Layout>
      <Head>
        <title>{name} — land of the Deno modules // deps.land</title>
      </Head>
      <Header selected={name} links={links} arrow="module">
        <div className="py-4">
          <h1>
            <span className="text-6xl font-bold">{name}</span>
            <span></span> {version}
          </h1>
          <p className="text-gray-500">{info && info.description}</p>
        </div>
      </Header>
      <Main>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-4 row-gap-8">
          <div>
            <h4 className="font-bold text-gray-400">
              {versionInfo && versionInfo.versions.length} releases:
            </h4>
            <table className="border-collapse">
              <tbody>
                <tr>
                  <th className="pr-2 text-right font-medium">1.12.2</th>
                  <td className="justify text-gray-500">x, nest</td>
                </tr>
                <tr>
                  <th className="pr-2 text-right font-medium">1.12.1</th>
                  <td className="justify text-gray-500">x</td>
                </tr>
                <tr>
                  <th className="pr-2 text-right font-medium">1.12.0</th>
                  <td className="justify text-gray-500">x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {readme ? (
          <Markdown
            source={readme.source}
            displayURL={"https://deps.land/" + canonicalPath}
            sourceURL={sourceURL + "/README.md"}
          />
        ) : (
          <></>
        )}
      </Main>
    </Layout>
  );
}

export default Module;
