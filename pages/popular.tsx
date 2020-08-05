import * as React from "react";
import Head from "next/head";

import SearchHeader from "~/components/sections/SearchHeader";
import CategoryBox from "~/components/category/CategoryBox";
import Layout from "~/components/layout/Layout";
import Main from "~/components/sections/Main";

function Popular() {
  return (
    <Layout>
      <Head>
        <title>deps.land — land of the Deno modules // deps.land</title>
      </Head>
      <SearchHeader selected="popular" />
      <Main>
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
      </Main>
    </Layout>
  );
}

export default Popular;
