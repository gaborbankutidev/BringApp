import {env} from "@/env.mjs";
import {NextResponse} from "next/server";

import path from "path";
import {asyncFn, tryPromise} from "ruts";

const getWpSitemapUrl = (pathname: string) =>
	path.join(env.NEXT_PUBLIC_WP_BASE_URL, pathname);

const getWpSitemapXml = asyncFn(async (requestUrl: string) => {
	const pathname = new URL(requestUrl).pathname.replace("/sitemap", "");
	const wpSitemapUrl = getWpSitemapUrl(pathname);

	const fetchResult = await tryPromise(fetch(wpSitemapUrl));

	if (fetchResult.isErr) {
		return fetchResult;
	}

	return await tryPromise(fetchResult.value.text());
});

const transformWpSitemapXml = (
	xml: string,
	hosts: {next: string; wp: string},
) => {
	const styleRemovedXml = xml.replaceAll(
		`<?xml-stylesheet type="text/xsl" href="//${hosts.wp}/main-sitemap.xsl"?>`,
		"",
	);

	const hostSwappedXml = styleRemovedXml.replaceAll(hosts.wp, hosts.next);

	// the below part is needed, to add the "sitemap" path to the sitemap urls
	const sitemapRegex = /<sitemap>(.*?)<\/sitemap>/gs;
	const matches = hostSwappedXml.match(sitemapRegex);
	const matchArray = matches ? matches.map((v) => v.trim()) : [];

	let sitemapAttachedXml = hostSwappedXml;
	for (const matchString of matchArray) {
		const transformedMatchString = matchString.replace(
			hosts.next,
			path.join(hosts.next, "sitemap"),
		);

		sitemapAttachedXml = sitemapAttachedXml.replace(
			matchString,
			transformedMatchString,
		);
	}

	return sitemapAttachedXml;
};

const getHosts = (request: Request) => {
	const wpHost = new URL(env.NEXT_PUBLIC_WP_BASE_URL).host;
	const nextHost = new URL(request.url).host;

	return {next: nextHost, wp: wpHost};
};

export async function GET(request: Request) {
	const hosts = getHosts(request);

	const wpSitemapXml = await getWpSitemapXml(request.url);

	if (wpSitemapXml.isErr) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	const transformedSitemapXml = transformWpSitemapXml(
		wpSitemapXml.value,
		hosts,
	);
	const response = new Response(transformedSitemapXml, {
		status: 200,
		statusText: "ok",
	});

	response.headers.append("content-type", "text/xml");

	return response;
}
