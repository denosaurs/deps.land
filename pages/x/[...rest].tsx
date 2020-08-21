import Head from "next/head";
import Link from "next/link";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";

import useSWR from "swr";

import Header, { HeaderLinks } from "~/components/sections/Header";
import Layout from "~/components/layout/Layout";
import Main from "~/components/sections/Main";
import Markdown from "~/components/markdown/Markdown";

import { fetcher } from "~/pages/_app";
import { useMemo, useEffect } from "react";
import { parseNameVersion, getSourceURL } from "~/modules/x";
import index, { ModuleInfo, VersionInfo } from "~/index/registry";

interface ModuleProps {
  found: boolean;
  path: string;
  name: string;
  version: string;
  id: string;
  mod: ModuleInfo;
  info: VersionInfo;
}

function Module({ found, name, version, path, id, mod, info }: ModuleProps) {
  const router = useRouter();

  useEffect(() => {
    if (!version && mod) {
      gotoVersion(mod.latest, true);
    }
  }, [version, mod]);

  function gotoVersion(v: string, replace?: boolean) {
    const href = "/x/[...rest]";
    const as = `/x/${name}@${v}${path}`;
    console.log(v);
    replace ? router.replace(href, as) : router.push(href, as);
  }

  if (!found && !router.isFallback) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }

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

  const links: HeaderLinks = {};
  if (name) {
    links[name] = (
      <Link href="/x/[...rest]" as={`/x/${id}`}>
        <a>{name}</a>
      </Link>
    );

    links["github"] = <a href={`https://github.com/${info.repo}`}>GitHub</a>;
  }

  return (
    <Layout>
      <Head>
        <title>{name} — land of the Deno modules // deps.land</title>
      </Head>
      <Header selected={name} links={links} arrow={name}>
        <div className="py-4">
          <h1>
            <span className="text-6xl font-bold">{name}</span>
            <span></span> {version}
          </h1>
          <p className="text-gray-500">{info && info.desc}</p>
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
  if (!mod) return { props: { found: false } };

  let info = mod.versions[version ?? mod.latest];
  version = version ?? null;

  if (!info) return { props: { found: false } };

  const id = `${name}@${version}`;

  return {
    props: {
      found: true,
      path,
      name,
      version,
      id,
      mod,
      info,
    },
  };
}

export default Module;
