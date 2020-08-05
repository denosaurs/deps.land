import * as React from "react";
import Head from "next/head";

import Header, { HeaderLinks } from "~/components/Header";
import Link from "next/link";

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
    <div>
      <Head>
        <title>deps.land — land of the Deno modules // deps.land</title>
      </Head>
      <Header selected="about" links={links} />
      <main className="px-4 pt-4">
        <section className="container max-w-6xl mx-auto p-4"></section>
      </main>
    </div>
  );
}

export default About;
