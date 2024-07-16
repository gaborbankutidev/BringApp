import type { SiteProps } from "../types";

/**
 * Retrieves the site properties from the specified WordPress URL.
 *
 * @template SP - The type of the site-specific properties.
 * @template M - The type of the menu data.
 * @template MI - The type of the menu item data.
 *
 * @param wpURL - The URL of the WordPress site.
 * @returns A promise that resolves to the site properties.
 */
async function getSiteProps<SP = {}, M = {}, MI = {}>(wpURL: string) {
  try {
    const response = await fetch(`${wpURL}/wp-json/bring/dynamic/site`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    return responseData.data as SiteProps<SP, M, MI>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getSiteProps;
