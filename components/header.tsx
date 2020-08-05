import * as React from "react";
import Link from "next/link";
import useSWR from "swr";

import { fetcher } from "../pages/_app";

function Header() {
  const { data: count } = useSWR(`/api/count`, fetcher);

  return (
    <header className="px-4 pt-4 bg-gray-200 dark:bg-gray-800">
      <div className="container max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold">
          <Link href="/">
            <a className="hover:underline">Deps.land</a>
          </Link>
        </h1>
        <p>
          Index of {count ? count.number : "~"} deno modules and applications.{" "}
          <Link href="/about">
            <a className="hover:underline text-blue-500">More...</a>
          </Link>
        </p>
        <form>
          <div className="py-3">
            <div className="inline-flex w-full">
              <input
                className="bg-gray-300 dark:bg-gray-700 font-medium py-2 px-4 rounded-l w-72"
                id="search"
                type="text"
                placeholder="name, keyword, ..."
              />
              <button className="bg-gray-400 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
                Search
              </button>
            </div>
          </div>
        </form>
        <nav className="flex flex-row">
          <div className="bg-white dark:bg-gray-900 text-center text-md px-4 mt-2 mr-2">
            Categories
          </div>
          <div className="bg-white dark:bg-gray-900 text-center text-md px-4 mt-2 mr-2">
            Popular
          </div>
          <div className="bg-white dark:bg-gray-900 text-center text-md px-4 mt-2 mr-2">
            New
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
