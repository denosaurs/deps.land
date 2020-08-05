import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

import { fetcher } from "./_app";
import SearchHeader from "~/components/SearchHeader";

import { ModulesQuery } from "~/modules/module";

interface CategoryBoxProps {
  category: string;
  title: string;
  description: string;
}

function CategoryBox({ category, title, description }: CategoryBoxProps) {
  const { data } = useSWR<ModulesQuery>(
    `/api/modules?query=${category}&max=40`,
    fetcher
  );
  return (
    <div>
      <header className="pb-4">
        <a>
          <h3 className="text-xl font-semibold mr-2">{title}</h3>
          <span className="text-sm text-gray-500">{description}</span>
        </a>
      </header>
      <ul className="list-none modules">
        {data &&
          data.results &&
          data.results
            .sort((a, b) => parseInt(b.star_count) - parseInt(a.star_count))
            .slice(0, 10)
            .map((value, index) => {
              return (
                <li className="inline" key={index}>
                  <Link href="/module/[module]" as={`/module/${value.name}`}>
                    <a className="hover:underline text-blue-500">
                      {value.name}
                    </a>
                  </Link>
                </li>
              );
            })}
        {data && data.results && <li className="inline">and more...</li>}
      </ul>
    </div>
  );
}

function New() {
  return (
    <div>
      <Head>
        <title>deps.land — land of the Deno modules // deps.land</title>
      </Head>
      <SearchHeader selected="new" />
      <main className="px-4 pt-4">
        <section className="container max-w-6xl mx-auto p-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-4 row-gap-8">
            <CategoryBox
              category="discord"
              title="Discord Libraries"
              description="Interact with the Discord API with ease"
            />
            <CategoryBox
              category="command line"
              title="Command Line Frameworks"
              description="Interfacing with the Discord API"
            />
            <CategoryBox
              category="http server"
              title="Server Frameworks"
              description="Interfacing with the Discord API"
            />
            <CategoryBox
              category="web framework"
              title="Web Frameworks"
              description="Interfacing with the Discord API"
            />
            <CategoryBox
              category="plugin"
              title="Plugins"
              description="Interfacing with the Discord API"
            />
            <CategoryBox
              category="monitor changes"
              title="File Watchers"
              description="Interfacing with the Discord API"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default New;
