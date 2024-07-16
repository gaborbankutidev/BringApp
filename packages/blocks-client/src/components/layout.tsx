import React, { type ReactNode } from "react";
import { createBringElement, getEntity, getSiteProps } from "../content";
import type { FCC } from "../types";

function makeLayout<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
  wpURL: string,
  dataToken: string,
  onRedirect: (redirectTo: string, responseCode: number) => void,
  onNotFound: () => void,
  componentMap: Map<string, FCC<any, EP, SP, M, MI, CTX>>,
) {
  const Layout = async ({
    slug = "",
    context,
    children,
  }: {
    slug?: string | string[];
    context?: CTX;
    children?: ReactNode;
  }) => {
    const siteProps = await getSiteProps<SP, M, MI>(wpURL);
    const entity = await getEntity<EP>(
      wpURL,
      dataToken,
      onRedirect,
      onNotFound,
      slug,
    );

    if (!entity) {
      return null;
    }

    return (
      <main>
        {entity.content.layout
          ? createBringElement(
              entity.content.layout,
              componentMap,
              entity.props,
              siteProps,
              context,
              children,
            )
          : children}
      </main>
    );
  };

  return Layout;
}

export default makeLayout;
