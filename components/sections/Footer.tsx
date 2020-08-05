import * as React from "react";

import VercelLogo from "~/public/images/vercel/vercel.svg";

function Footer() {
  return (
    <footer className="p-4 bg-gray-200 dark:bg-gray-800">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <p>&copy; {new Date().getUTCFullYear()} Denosaurs team</p>
          <a href="https://vercel.com?utm_source=deps-land">
            <h1 className="flex items-center">
              Powered by{" "}
              <VercelLogo className="ml-2 fill-current dark:text-white h-8" />
            </h1>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
