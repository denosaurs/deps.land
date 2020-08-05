import Link from "next/link";
import useSWR from "swr";

import { fetcher } from "~/pages/_app";

import { ModulesQuery } from "~/modules/module";

interface CategoryBoxProps {
  category: string;
  title: string;
  description: string;
}

function CategoryBox({ category, title, description }: CategoryBoxProps) {
  const { data } = useSWR<ModulesQuery>(
    `/api/modules?query=${category}&max=40`,
    fetcher
  );
  return (
    <div>
      <header className="pb-4">
        <a>
          <h3 className="text-xl font-semibold mr-2">{title}</h3>
          <span className="text-sm text-gray-500">{description}</span>
        </a>
      </header>
      <ul className="list-none modules">
        {data &&
          data.results &&
          data.results
            .sort((a, b) => parseInt(b.star_count) - parseInt(a.star_count))
            .slice(0, 10)
            .map((value, index) => {
              return (
                <li className="inline" key={index}>
                  <Link href="/module/[module]" as={`/module/${value.name}`}>
                    <a className="hover:underline text-blue-500">
                      {value.name}
                    </a>
                  </Link>
                </li>
              );
            })}
        {data && data.results && <li className="inline">and more...</li>}
      </ul>
    </div>
  );
}

export default CategoryBox;