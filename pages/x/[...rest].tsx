import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";

import Header, { HeaderLinks } from "~/components/sections/Header";
import Layout from "~/components/layout/Layout";
import Main from "~/components/sections/Main";
import Markdown from "~/components/markdown/Markdown";

import { ModuleInfo, ModuleMeta } from "~/modules/module";
import { ModuleNest } from "~/modules/nest";
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
  const { data: nest } = useSWR<ModuleNest>(
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
      <Header selected={name} links={links} />
      <Main>
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
