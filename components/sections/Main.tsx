import * as React from "react";

interface MainProps {
  children: Children;
}

function Main({ children }: MainProps) {
  return (
    <main className="px-4 pt-4">
      <section className="container max-w-6xl mx-auto p-4">{children}</section>
    </main>
  );
}

export default Main;
