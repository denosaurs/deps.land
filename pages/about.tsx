import React from "react";
import Head from "next/head";
import Link from "next/link";

import Header, { HeaderLinks } from "~/components/sections/Header";
import Main from "~/components/sections/Main";
import Layout from "~/components/layout/Layout";
import Meta from "~/components/seo/Meta";

const links: HeaderLinks = {
  about: (
    <Link href="/about">
      <a>About</a>
    </Link>
  ),
  github: <a href="https://github.com/denosaurs">Github</a>,
  twitter: <a href="https://twitter.com/denosaurs">Twitter</a>,
};

function About() {
  return (
    <Layout>
      <Meta title="about" />
      <Header selected="about" links={links} arrow="about" />
      <Main>
        <section className="container max-w-6xl mx-auto p-4"></section>
      </Main>
    </Layout>
  );
}

export default About;
