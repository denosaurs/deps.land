import * as React from "react";

import Link from "next/link";
import clsx from "clsx";

export type HeaderLinks = {
  [key: string]: JSX.Element;
};

interface HeaderProps {
  selected: string;
  links: HeaderLinks;
}

function Header({ selected, links }: HeaderProps) {
  return (
    <header className="px-4 pt-4 bg-gray-200 dark:bg-gray-800">
      <div className="container max-w-6xl mx-auto px-4">
        <h1 className="text-2xl">
          <Link href="/">
            <a className="hover:underline font-bold mr-2 text-3xl">Deps.land</a>
          </Link>
          {selected !== "categories" && <span>› {selected}</span>}
        </h1>
        <div>{/* maybe children? */}</div>
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

export default Header;
