import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import useSWR from "swr";

import Header, { HeaderLinks } from "~/components/sections/Header";
import Layout from "~/components/layout/Layout";
import Main from "~/components/sections/Main";
import Markdown from "~/components/markdown/Markdown";

import { fetcher } from "~/pages/_app";
import { useMemo, useEffect } from "react";
import { parseNameVersion, getSourceURL } from "~/modules/x";
import index, { ModuleInfo, VersionInfo, IndexInfo } from "~/index/registry";
import Error from "~/pages/404";
import Meta from "~/components/seo/Meta";

interface ModuleProps {
  found: boolean;
  path: string;
  name: string;
  version: string;
  mod: ModuleInfo;
  info: VersionInfo;
  index: IndexInfo;
}

function Module({ found, name, version, path, mod, info, index }: ModuleProps) {
  const router = useRouter();

  if (!found && !router.isFallback) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <Error index={index} />
      </>
    );
  }

  function gotoVersion(v: string, replace?: boolean) {
    const href = "/x/[...rest]";
    const as = `/x/${name}@${v}${path}`;
    console.log(v);
    replace ? router.replace(href, as) : router.push(href, as);
  }

  useEffect(() => {
    if (!version && mod) {
      gotoVersion(mod.latest, true);
    }
  }, [version, mod]);

  const { data: readme } = useSWR(
    name && version
      ? `/api/module/source/${`${name}@${version}`}/README.md`
      : null,
    fetcher
  );

  const canonicalPath = useMemo(() => `/x/${`${name}@${version}`}${path}`, [
    name,
    version,
    path,
  ]);
  const sourceURL = useMemo(() => getSourceURL(name, version, path), [
    name,
    version,
    path,
  ]);

  const links: HeaderLinks = {};
  if (name && version) {
    links[name] = (
      <Link href="/x/[...rest]" as={`/x/${`${name}@${version}`}`}>
        <a>{name}</a>
      </Link>
    );

    links["github"] = <a href={`https://github.com/${info.repo}`}>GitHub</a>;
  }

  return (
    <Layout>
      <Meta title={name} />
      <Header selected={name} links={links} arrow={name}>
        <div className="py-4">
          <h1>
            <span className="text-6xl font-bold">{name}</span>
            <span></span> {version}
          </h1>
          <p className="dark:text-gray-500 text-gray-700">
            {info && info.desc}
          </p>
        </div>
      </Header>
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

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const [identifier, ...pathParts] = (params.rest as string[]) ?? [];
  const path = pathParts.length === 0 ? "" : `/${pathParts.join("/")}`;

  let [name, version] = parseNameVersion(identifier ?? "");

  const mod = await index.module("x", name);
  if (!mod) return { props: { found: false, index: index.info() } };

  let info = mod.versions[version ?? mod.latest];
  version = version ?? null;

  if (!info) return { props: { found: false, index: index.info() } };

  return {
    props: {
      found: true,
      path,
      name,
      version,
      mod,
      info,
    },
  };
}

export default Module;
