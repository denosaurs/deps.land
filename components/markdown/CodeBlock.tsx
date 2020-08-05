/* Copyright 2020 the Deno authors. All rights reserved. MIT license. */
/* Modified */

import React from "react";

import Highlight, { Prism } from "prism-react-renderer";

import dark from "prism-react-renderer/themes/palenight";
import light from "prism-react-renderer/themes/github";
import useMedia from "~/hooks/media";

(typeof global !== "undefined" ? global : (window as any)).Prism = Prism;

require("prismjs/components/prism-rust");
require("prismjs/components/prism-toml");

export interface CodeBlockProps {
  code: string;
  disablePrefixes?: boolean;
  language:
    | "javascript"
    | "typescript"
    | "jsx"
    | "tsx"
    | "json"
    | "jsonc"
    | "yaml"
    | "markdown"
    | "bash"
    | "shell"
    | "text"
    | "rust"
    | "python"
    | "toml"
    | "wasm"
    | "makefile"
    | "dockerfile";
}

export const RawCodeBlock = ({
  code,
  language,
  className: extraClassName,
}: CodeBlockProps & { className?: string; enableLineRef?: boolean }) => {
  const theme = useMedia(
    ["(prefers-color-scheme: dark)", "(prefers-color-scheme: light)"],
    [dark, light],
    dark
  );

  return (
    <Highlight
      Prism={Prism}
      theme={theme}
      code={code}
      // @ts-ignore
      language={
        language === "shell"
          ? "bash"
          : language === "text"
          ? "diff"
          : language === "jsonc"
          ? "json"
          : language
      }
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className + " flex overflow-y-auto " + (extraClassName ?? "")
          }
          style={{ ...style }}
        >
          <code>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              lineProps.className += " text-sm";
              return line[0]?.empty && i === tokens.length - 1 ? null : (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                  {line[0]?.empty ? "\n" : ""}
                </div>
              );
            })}
          </code>
        </pre>
      )}
    </Highlight>
  );
};

const CodeBlock = ({ code, language, disablePrefixes }: CodeBlockProps) => {
  return (
    <RawCodeBlock
      code={code}
      language={language}
      disablePrefixes={disablePrefixes}
      className="rounded p-1 px-2 sm:px-3"
    />
  );
};

export default CodeBlock;
