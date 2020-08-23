import React from "react";

import Link from "next/link";
import clsx from "clsx";

import { connectAutoComplete } from "react-instantsearch-dom";

import { HeaderLinks } from "./Header";
import { IndexInfo } from "~/index";

/* Algolia stuff */
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import { AlgoliaObject } from "~/setup/algolia-search";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
);

const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

interface SearchResultProps {
  hit: AlgoliaObject;
}

function SearchResult({ hit }: SearchResultProps) {
  return (
    <div className="flex p-2">
      <div className="flex-grow">
        <h5 className="font-bold link">{hit.name}</h5>
        <p className="text-sm">{hit.desc}</p>
      </div>
      <p className="font-mono text-sm">{hit.vers}</p>
    </div>
  );
}

interface SearchBoxProps {
  hits: AlgoliaObject[];
  currentRefinement: string;
  refine: (value: string) => void;
}

function SearchBox({ hits, currentRefinement, refine }: SearchBoxProps) {
  return (
    <div className="relative w-full flex-grow">
      <div className="flex">
        <input
          className="bg-gray-300 dark:bg-gray-700 font-medium py-2 px-4 flex-grow rounded-l rounded-r-none focus:outline-none appearance-none"
          name="search"
          type="search"
          placeholder="name, keyword, ..."
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          aria-label="Search modules"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />

        <button className="bg-gray-400 hover:bg-gray-400 text-gray-800 ml- font-bold py-2 px-4 rounded-l-none rounded-r">
          Search
        </button>
      </div>
      {currentRefinement && (
        <div className="absolute bg-white dark:bg-gray-900 rounded w-full mt-2 p-2 shadow-md">
          <ul>
            {hits.slice(0, 6).map((hit: AlgoliaObject) => (
              <li
                key={hit.objectID}
                className="border-b last:border-b-0 border-gray-500"
              >
                <SearchResult hit={hit} />
              </li>
            ))}
            {hits.length == 0 && <li key="not-found">No results found...</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

interface SearchHeaderProps {
  selected: string;
  links?: HeaderLinks;
  index?: IndexInfo;
}

const AlgoliaSearchBox = connectAutoComplete(SearchBox);

function SearchHeader({ selected, links, index }: SearchHeaderProps) {
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
          <div className="flex">
            <InstantSearch
              indexName={algoliaIndex}
              searchClient={algoliaClient}
            >
              <AlgoliaSearchBox />
              <div className="md:w-7/12 flex-none"></div>
            </InstantSearch>
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
