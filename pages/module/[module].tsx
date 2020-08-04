import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

import { ModuleInfo, ModuleMeta } from "../../modules/module";
import { ModuleNest } from "../../modules/nest";

import { fetcher } from "../_app";

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
      <header className="px-4 pt-4 bg-white dark:bg-gray-800">
        <div className="container max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Deps.land</h1>
          <p>
            Index of {count ? count.number : "~"} deno modules and applications.
          </p>
          <form>
            <div className="py-3">
              <div className="inline-flex">
                <input
                  className="bg-gray-700 text-gray-800 font-bold py-2 px-4 rounded-l"
                  id="search"
                  type="text"
                  placeholder="name, keyword, ..."
                />
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                  Search
                </button>
              </div>
            </div>
          </form>
          <nav className="flex flex-row">
            <div className="bg-white dark:bg-gray-900 text-center px-4 mt-2 mx-1">
              Categories
            </div>
            <div className="bg-white dark:bg-gray-900 text-center px-4 mt-2 mx-1">
              Popular
            </div>
            <div className="bg-white dark:bg-gray-900 text-center px-4 mt-2 mx-1">
              New
            </div>
          </nav>
        </div>
      </header>
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
