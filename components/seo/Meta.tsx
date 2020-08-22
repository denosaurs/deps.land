import { useMemo } from "react";
import Head from "next/head";

interface MetaProps {
  title: string;
  dynamic?: boolean;
}

const HOST = "deps.land";
const URL = "https://deps.land";
const TITLE = `${HOST} - land of the Deno modules`;
const DESCRIPTION =
  "List of Deno modules and applications that supports all the registries.";

const OG = "https://og.deps.land/";

export default function Meta({ title, dynamic }: MetaProps) {
  const image = useMemo(() => {
    return dynamic ? `${OG}${title}.png` : `${OG}.png`;
  }, [title, dynamic]);

  return (
    <Head>
      <title>
        {title} - land of the Deno modules // {HOST}
      </title>
      <meta name="title" content={TITLE} />
      <meta name="description" content={DESCRIPTION} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={URL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={URL} />
      <meta property="twitter:title" content={TITLE} />
      <meta property="twitter:description" content={DESCRIPTION} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
}
