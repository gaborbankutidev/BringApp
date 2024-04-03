"use client";

import {useEffect, useState} from "react";
import {getSiteProps} from "../content";
import type {SiteProps} from "../types";

export function useSiteProps<SP = {}, M = {}, MI = {}>(wpURL: string) {
	const [siteProps, setSiteProps] = useState<SiteProps<SP, M, MI> | null>(null);

	// query site props
	useEffect(() => {
		getSiteProps<SP, M, MI>(wpURL).then((queriedSiteProps) => {
			if (!queriedSiteProps) {
				return;
			}
			setSiteProps(queriedSiteProps);
		});
	}, []);

	return siteProps;
}
