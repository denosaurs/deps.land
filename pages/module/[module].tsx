import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

import { ModuleInfo, ModuleMeta } from "../../modules/module";
import { ModuleNest } from "../../modules/nest";

import { fetcher } from "../_app";
import Header from "../../components/header";

function Module() {
  const router = useRouter();
  const { module } = router.query;
  const { data: count } = useSWR(`/api/count`, fetcher);
  const { data: info, error: infoError } = useSWR<ModuleInfo>(
    `/api/module/info/${module}`,
    fetcher
  );
  const { data: meta, error: metaError } = useSWR<ModuleMeta>(
    `/api/module/meta/${module}`,
    fetcher
  );
  const { data: nest, error: nestError } = useSWR<ModuleNest>(
    `/api/module/registries/${module}`,
    fetcher
  );

  return (
    <div>
      <Head>
        <title>{module} — land of the Deno modules // deps.land</title>
      </Head>
      <Header />
      <div className="container px-2 py-4 max-w-5xl mx-auto">
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
