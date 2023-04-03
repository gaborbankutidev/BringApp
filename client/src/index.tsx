import React, { useContext } from "react";
import type { FC } from "react";
import { createRoot } from "react-dom/client";
import { createBringElement } from "./render";
import { postContent } from "./components/post-content";
import type { EntityProps, SiteProps } from "./types";
import {
  BringContext,
  BringContextProvider,
  useBringContext,
} from "./context/bring-context";

export function initStaticHooks<
  SP extends { [key: string]: any },
  EP extends { [key: string]: any }
>() {
  const useSiteProps = () => {
    const { siteProps } = useContext(BringContext);
    return siteProps as SiteProps<SP>;
  };

  const useEntityProps = () => {
    const { entityProps } = useContext(BringContext);
    return entityProps as EntityProps<EP>;
  };

  return { useSiteProps, useEntityProps };
}

const Page: FC = () => {
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

const Cache: FC = () => {
  const { entityContent, componentMap } = useBringContext();

  return (
    <>
      {entityContent.layout
        ? createBringElement(entityContent.layout, componentMap, true)
        : createBringElement(entityContent.main, componentMap)}
    </>
  );
};

export function clientInit(
  componentList: { componentName: string; Component: FC<any> }[],
  Wrapper: FC<{ children: React.ReactNode }> = React.Fragment
) {
  const componentMap = new Map<string, FC<any>>();
  componentList.push(postContent);
  componentList.forEach(({ Component, componentName }) =>
    componentMap.set(componentName, Component)
  );

  const bringCache = document.getElementById("bringCache");
  if (bringCache) {
    const root = createRoot(bringCache);
    root.render(
      <BringContextProvider componentMap={componentMap}>
        {React.createElement(Wrapper, null, <Cache />)}
      </BringContextProvider>
    );
  }

  const bringContent = document.getElementById("bringContent");
  if (bringContent) {
    const root = createRoot(bringContent);
    root.render(
      <BringContextProvider componentMap={componentMap}>
        {React.createElement(Wrapper, null, <Page />)}
      </BringContextProvider>
    );
  }
}
