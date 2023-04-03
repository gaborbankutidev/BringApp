import React from "react";
import type { FC } from "react";
import { createBringElement } from "./render";
import { useBringContext } from "./context/bring-context";

export const Page: FC = () => {
  const { entityContent, componentMap } = useBringContext();

  return (
    <>
      {entityContent.header && (
        <header>
          {createBringElement(entityContent.header, componentMap)}
        </header>
      )}
      <main>
        {entityContent.layout
          ? createBringElement(entityContent.layout, componentMap, true)
          : createBringElement(entityContent.main, componentMap)}
      </main>
      {entityContent.footer && (
        <footer>
          {createBringElement(entityContent.footer, componentMap)}
        </footer>
      )}
    </>
  );
};
