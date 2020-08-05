import * as React from "react";

import Link from "next/link";
import useSWR from "swr";
import clsx from "clsx";

import { fetcher } from "~/pages/_app";
import { HeaderLinks } from "~/components/Header";

const links: HeaderLinks = {
  categories: (
    <Link href="/">
      <a>Categories</a>
    </Link>
  ),
  popular: (
    <Link href="/popular">
      <a>Popular</a>
    </Link>
  ),
  new: (
    <Link href="/new">
      <a>New</a>
    </Link>
  ),
};

interface SearchHeaderProps {
  selected: keyof typeof links;
}

function SearchHeader({ selected }: SearchHeaderProps) {
  const { data: count } = useSWR(`/api/count`, fetcher);

  return (
    <header className="px-4 pt-4 bg-gray-200 dark:bg-gray-800">
      <div className="container max-w-6xl mx-auto px-4">
        <h1 className="text-2xl">
          <Link href="/">
            <a className="hover:underline font-bold mr-2 text-3xl">Deps.land</a>
          </Link>
          {selected !== "categories" && <span>› {selected}</span>}
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
          {Object.entries(links).map(([name, link], index) => {
            const isSelected = name === selected;
            return (
              <div
                key={index}
                className={clsx("px-4 py-1 mt-2 mr-2", {
                  "bg-white dark:bg-gray-900": isSelected,
                  "bg-gray-200 dark:bg-gray-800": !isSelected,
                })}
              >
                <div className="text-center text-md hover:underline">
                  {link}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default SearchHeader;
