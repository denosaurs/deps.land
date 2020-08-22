import React, { useCallback, useState } from "react";

import Link from "next/link";
import clsx from "clsx";

import { HeaderLinks } from "./Header";
import { IndexInfo } from "~/index/registry";

interface SearchHeaderProps {
  selected: string;
  links?: HeaderLinks;
  index?: IndexInfo;
}

function SearchHeader({ selected, links, index }: SearchHeaderProps) {
  const [query, setQuery] = useState("");
  const onSearchChange = useCallback(
    (event) => {
      setQuery(event.target.value);
    },
    [query]
  );

  const onSearchClick = useCallback(() => {
    console.log(query);
  }, [query]);

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
          Index of {index ? index.total : "~"} deno modules and applications.{" "}
          <Link href="/about">
            <a className="link">More...</a>
          </Link>
        </p>
        <div className="py-3 hidden xs:block">
          <div className="inline-flex shadow-lg">
            <input
              className="bg-gray-300 dark:bg-gray-700 font-medium py-2 px-4 rounded-l rounded-r-none w-72 search focus:outline-none"
              id="search"
              type="search"
              placeholder="name, keyword, ..."
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              aria-label="Search modules"
              onChange={onSearchChange}
            />
            <button
              className="bg-gray-400 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l-none rounded-r"
              onClick={onSearchClick}
            >
              Search
            </button>
          </div>
        </div>
        <nav className="flex flex-row">
          {links &&
            Object.entries(links).map(([name, link], index) => {
              const isSelected = name === selected;
              return (
                <div
                  key={index}
                  className={clsx("px-4 py-1 mt-2 mr-1", {
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
