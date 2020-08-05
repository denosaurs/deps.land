import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

import Header, { HeaderLinks } from "~/components/Header";

import { ModuleInfo, ModuleMeta } from "~/modules/module";
import { ModuleNest } from "~/modules/nest";
import { fetcher } from "~/pages/_app";
import Link from "next/link";

function Module() {
  const router = useRouter();

  let { module } = router.query;
  if (Array.isArray(module)) module = module.join("");

  const { data: info, error: infoError } = useSWR<ModuleInfo>(
    module ? `/api/module/info/${module}` : null,
    fetcher
  );
  const { data: meta, error: metaError } = useSWR<ModuleMeta>(
    module ? `/api/module/meta/${module}` : null,
    fetcher
  );
  const { data: nest, error: nestError } = useSWR<ModuleNest>(
    module ? `/api/module/registries/${module}` : null,
    fetcher
  );
  const { data: readme, error: readmeError } = useSWR(
    module ? `/api/module/source/${module}/README.md` : null,
    fetcher
  );

  const links: HeaderLinks = {};
  if (module) {
    links[module] = (
      <Link href="/module/[module]" as={`/module/${module}`}>
        <a>{module}</a>
      </Link>
    );

    if (meta) {
      const repo = meta.info.uploadOptions.repository;
      links["github"] = <a href={`https://github.com/${repo}`}>GitHub</a>;
    }
  }

  return (
    <div>
      <Head>
        <title>{module} — land of the Deno modules // deps.land</title>
      </Head>
      <Header selected={module} links={links} />
      <div className="container px-2 py-4 max-w-5xl mx-auto">
        {readme ? (
          <ReactMarkdown
            source={readme.source}
            className="markdown"
            escapeHtml={true}
          />
        ) : (
          "loading"
        )}
        <pre>
          <code>{JSON.stringify(info, null, 2)}</code>
        </pre>
        <pre>
          <code>{JSON.stringify(meta, null, 2)}</code>
        </pre>
        <pre>
          <code>{JSON.stringify(nest, null, 2)}</code>
        </pre>
      </div>
      <footer className="my-10 py-5 text-gray-500">
        <div className="container px-2 max-w-2xl mx-auto">
          &copy; {new Date().getFullYear()} Denosaurs.
        </div>
      </footer>
    </div>
  );
}

export default Module;
