import React from "react";
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="en" prefix="og: http://ogp.me/ns#">
        <Head>
          <link rel="stylesheet" href="/fonts/inter/inter.css" />
        </Head>
        <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
