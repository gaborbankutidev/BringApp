"use client"

import { useEffect, useState } from "react"
import { getSiteProps } from "../content"
import type { SiteProps } from "../types"

/**
 * Custom hook to fetch and return site props.
 *
 * @template SP - Type for site-specific props.
 * @template M - Type for metadata.
 * @template MI - Type for menu items.
 * @param wpURL - WordPress URL.
 * @returns Site props or null if not available.
 */
export function useSiteProps<SP = object, M = object, MI = object>(wpURL: string) {
	const [siteProps, setSiteProps] = useState<SiteProps<SP, M, MI> | null>(null);

	// query site props
	useEffect(() => {
		getSiteProps<SP, M, MI>(wpURL).then((queriedSiteProps) => {
			if (!queriedSiteProps) {
				return
			}
			setSiteProps(queriedSiteProps)
		})
	}, [])

	return siteProps
}
