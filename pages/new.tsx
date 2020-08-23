import React from "react";
import Head from "next/head";
import Link from "next/link";

import { HeaderLinks } from "~/components/sections/Header";
import SearchHeader from "~/components/sections/SearchHeader";
import CategoryBox from "~/components/category/CategoryBox";
import Layout from "~/components/layout/Layout";
import Main from "~/components/sections/Main";
import idx, { IndexInfo } from "~/index";
import Meta from "~/components/seo/Meta";

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

interface NewProps {
  index: IndexInfo;
}

export default function New({ index }: NewProps) {
  return (
    <Layout>
      <Meta title="new" />
      <SearchHeader selected="new" links={links} index={index} />
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
  const index = idx.info();
  return {
    props: {
      index,
    },
  };
}
