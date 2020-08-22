import Head from "next/head";

interface MetaProps {
  title: string;
}

const HOST = "deps.land";
const URL = "https://deps.land";
const TITLE = `${HOST} - land of the Deno modules`;
const DESCRIPTION =
  "List of Deno modules and applications that supports all the registries.";

const IMAGE = "https://og.deps.land/.png";

export default function Meta({ title }: MetaProps) {
  return (
    <Head>
      {title && (
        <title>
          {title} - land of the Deno modules // {HOST}
        </title>
      )}
      <meta name="title" content={TITLE} />
      <meta name="description" content={DESCRIPTION} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={URL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={IMAGE} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={URL} />
      <meta property="twitter:title" content={TITLE} />
      <meta property="twitter:description" content={DESCRIPTION} />
      <meta property="twitter:image" content={IMAGE} />
    </Head>
  );
}
