import React from "react";
import type { FCC } from "../types";
import { getEntity, getSiteProps, createBringElement } from "../content";

function makeFooter<EP = {}, SP = {}, M = {}, MI = {}, CTX = {}>(
  wpURL: string,
  dataToken: string,
  onRedirect: (redirectTo: string, responseCode: number) => void,
  onNotFound: () => void,
  componentMap: Map<string, FCC<any, EP, SP, M, MI, CTX>>,
) {
  const Footer = async ({
    slug = "",
    context,
  }: {
    slug?: string | string[];
    context?: CTX;
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

    return entity.content.footer ? (
      <footer>
        {createBringElement(
          entity.content.footer,
          componentMap,
          entity.props,
          siteProps,
          context,
        )}
      </footer>
    ) : null;
  };

  return Footer;
}

export default makeFooter;
