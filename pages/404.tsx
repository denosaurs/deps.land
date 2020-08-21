import React from "react";
import Head from "next/head";

import SearchHeader from "~/components/sections/SearchHeader";
import Layout from "~/components/layout/Layout";
import Main from "~/components/sections/Main";
import { info, IndexInfo } from "~/index/registry";

interface IndexProps {
  index: IndexInfo;
}

function Error404({ index }: IndexProps) {
  return (
    <Layout>
      <Head>
        <title>deps.land — land of the Deno modules // deps.land</title>
      </Head>
      <SearchHeader selected="categories" index={index} />
      <Main>
        <div className="m-auto text-center">
          <h1 className="text-6xl font-bold">Not found</h1>
          <p className="text-gray-500">404</p>
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

export default Error404;
