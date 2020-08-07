import * as React from "react";
import Head from "next/head";

import SearchHeader from "~/components/sections/SearchHeader";
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
        <div className="m-auto text-center">
          <h1 className="text-6xl font-bold">Not found</h1>
          <p className="text-gray-500">404</p>
        </div>
      </Main>
    </Layout>
  );
}

export default Index;
