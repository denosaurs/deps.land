import * as React from "react";
import Head from "next/head";

import SearchHeader from "~/components/sections/SearchHeader";
import CategoryBox from "~/components/category/CategoryBox";
import Layout from "~/components/layout/Layout";
import Main from "~/components/sections/Main";

function Index() {
  return (
    <Layout>
      <Head>
        <title>deps.land — land of the Deno modules // deps.land</title>
      </Head>
      <SearchHeader selected="categories" />
      <Main>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-4 row-gap-8">
          <CategoryBox
            category="discord"
            title="Discord Libraries"
            description="Create bots and application interacting with the Discord API"
          />
          <CategoryBox
            category="command line"
            title="Command-line interface"
            description="Argument parsers, line editing, or output coloring and formatting"
          />
          <CategoryBox
            category="http server"
            title="HTTP Frameworks"
            description="Serve data over HTTP"
          />
          <CategoryBox
            category="web framework"
            title="Web Frameworks"
            description="Create applications for the web"
          />
          <CategoryBox
            category="plugin"
            title="Plugins"
            description="Interact with deno native rust plugins"
          />
          <CategoryBox
            category="monitor changes"
            title="File Watchers"
            description="Monitor changes in your development environment"
          />
        </div>
      </Main>
    </Layout>
  );
}

export default Index;
