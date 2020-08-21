import React from "react";

import "~/styles/globals.scss";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
