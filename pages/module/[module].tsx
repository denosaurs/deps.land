import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

import { ModuleInfo, ModuleMeta } from "../../modules/module";
import { ModuleNest } from "../../modules/nest";

import GitHubIcon from "../../public/icons/github.svg";
import DiscordIcon from "../../public/icons/discord.svg";
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
        <title>deps.land — land of the Deno modules // deps.land</title>
      </Head>
      <header className="dark:border-white border-black border-b-2">
        <div className="container px-2 py-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl flex items-center dark:text-white font-bold">
              deps.land
            </h1>
            <div>
              <a
                href="https://github.com/denosaurs/deps.land"
                target="_blank"
                rel="noopener nofollow"
              >
                <GitHubIcon className="fill-current dark:text-white h-8 w-8" />
              </a>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p>
                Index of {count ? count.number : "~"} deno modules and
                applications.
              </p>
            </div>
            <div>
              <a
                href="https://github.com/denosaurs/deps.land"
                target="_blank"
                rel="noopener nofollow"
              >
                <DiscordIcon className="fill-current dark:text-white h-8 w-8" />
              </a>
            </div>
          </div>
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
