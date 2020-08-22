/* Copyright 2020 the Deno authors. All rights reserved. MIT license. */
/* Modified */

import React from "react";

function InlineCode(props: { children: React.ReactNode }) {
  return (
    <code className="font-mono rounded-sm focus:language-text">
      {props.children}
    </code>
  );
}

export default InlineCode;
