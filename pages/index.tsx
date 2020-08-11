import * as React from "react";
import Head from "next/head";
import Link from "next/link";

import { HeaderLinks } from "~/components/sections/Header";
import SearchHeader from "~/components/sections/SearchHeader";
import CategoryBox from "~/components/category/CategoryBox";
import Layout from "~/components/layout/Layout";
import Main from "~/components/sections/Main";
import { IndexInfo, info } from "~/index/registry";

const links: HeaderLinks = {
  categories: (
    <Link href="/">
      <a>Categories</a>
    </Link>
  ),
  new: (
    <Link href="/new">
      <a>New</a>
    </Link>
  ),
};

interface IndexProps {
  index: IndexInfo;
}

export default function Index({ index }: IndexProps) {
  return (
    <Layout>
      <Head>
        <title>deps.land — land of the Deno modules // deps.land</title>
      </Head>
      <SearchHeader selected="categories" links={links} index={index} />
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

export async function getStaticProps() {
  const index = info();
  return {
    props: {
      index,
    },
  };
}
