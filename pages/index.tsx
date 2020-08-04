import * as React from "react";
import Head from "next/head";
import useSWR from "swr";

import { fetcher } from "./_app";

function Home() {
  const { data: count } = useSWR(`/api/count`, fetcher);

  return (
    <div>
      <Head>
        <title>deps.land — land of the Deno modules // deps.land</title>
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
    </div>
  );
}

export default Home;
