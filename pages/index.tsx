import * as React from "react";
import Head from "next/head";

import GitHubIcon from "../public/icons/github.svg";
import DiscordIcon from "../public/icons/discord.svg";

const Span: React.FC<{ bg: string; leading?: boolean }> = ({
  children,
  bg,
  leading,
}) => {
  return (
    <span
      className={
        `rounded px-2 h-6 inline-flex items-center text-white text-sm` +
        (bg ? ` ${bg}` : "") +
        (leading ? ` mr-2` : ` mx-2`)
      }
    >
      {children}
    </span>
  );
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>deps.land — land of the Deno modules // deps.land</title>
      </Head>
      <header className="dark:border-white border-black border-b-2">
        <div className="container px-2 py-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl flex items-center dark:text-white font-bold">
              deps.land
            </h1>
            <div>
              <a
                href="https://github.com/denopkg/denopkg.com"
                target="_blank"
                rel="noopener nofollow"
              >
                <GitHubIcon className="fill-current dark:text-white h-8 w-8" />
              </a>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p>Index of 44,669 Rust libraries and applications.</p>
            </div>
            <div>
              <a
                href="https://github.com/denopkg/denopkg.com"
                target="_blank"
                rel="noopener nofollow"
              >
                <DiscordIcon className="fill-current dark:text-white h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </header>
      <footer className="my-10 py-5 text-gray-500">
        <div className="container px-2 max-w-2xl mx-auto">
          &copy; {new Date().getFullYear()} Denosaurs.
        </div>
      </footer>
    </div>
  );
}
