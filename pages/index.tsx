import * as React from "react";
import Head from "next/head";

import SearchHeader from "~/components/SearchHeader";
import CategoryBox from "~/components/category/CategoryBox";

function Index() {
  return (
    <div>
      <Head>
        <title>deps.land — land of the Deno modules // deps.land</title>
      </Head>
      <SearchHeader selected="categories" />
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

export default Index;
