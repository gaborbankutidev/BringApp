import React, {ReactNode} from "react";
import type {EntityType, FCC} from "../types";
import {useBringContext} from "@bring/blocks-client";

// TODO Finalize link component

type Entity = {
	id: number;
	type: EntityType;
	slug?: string;
};

type _Link = {
	newTab?: boolean;
	children: ReactNode;
};

type LinkExternalProps = {
	url: string;
	download?: boolean;
} & _Link;

type LinkInternalProps = {
	external?: false;
	entity: Entity;
} & _Link;

type _LinkExternalProps = {
	external: true;
} & LinkExternalProps;

type _LinkInternalProps = {
	external?: false;
} & LinkInternalProps;

type LinkProps = _LinkExternalProps | _LinkInternalProps;

export const Link: FCC<LinkProps> = (props) =>
	props.external ? <LinkExternal {...props} /> : <LinkInternal {...props} />;

const LinkExternal: FCC<LinkExternalProps> = ({
	url,
	newTab,
	download = false,
	children,
	className,
}) => {
	return (
		<a
			href={url ?? "#"}
			target={newTab ? "_blank" : "_self"}
			className={className}
			download={download}
		>
			{children}
		</a>
	);
};

const useLink = (entity: Entity) => {
	// cached content for url
	const {contentCache} = useBringContext();
	const cacheKey = `${entity.type}_${entity.id}`;
	const cashedContent = contentCache.get(cacheKey);

	return {
		url: cashedContent?.url ?? "#",
		query: () => {},
		set: () => {},
	};
};

const LinkInternal: FCC<LinkInternalProps> = ({
	entity,
	newTab = false,
	children,
	className = "",
}) => {
	const {url, query, set} = useLink(entity);

	return newTab ? (
		<a href={url} target="_blank" className={className}>
			{children}
		</a>
	) : (
		<a href={url} className={className} onMouseEnter={query} onClick={set}>
			{children}
		</a>
	);
};

// todo fix query
export const _useLink = (entity: Entity) => {
	// cached content for url
	const {contentCache, setEntityContent, setEntityProps} = useBringContext();
	const cacheKey = `${entity.type}_${entity.id}`;
	const cashedContent = contentCache.get(cacheKey);
	console.log(cashedContent);

	/* 	// state for content is queried or not
	const [queried, _setQueried] = useState(!!cashedContent?.content);
	const setQueried = useCallback(
		() => !queried && _setQueried(true),
		[_setQueried],
	); */

	const getEntityContent = () => {
		console.log("get entity content");
	};

	// set page content
	const setContent = () => {
		// if the content is loading try again in 50ms
		if (cashedContent?.isLoading) {
			setTimeout(setContent, 50);
			return;
		}

		// if the content is not cached query and try again in 50ms
		if (!cashedContent?.content) {
			getEntityContent();
			setTimeout(setContent, 50);
			return;
		}

		// set content if already cached
		setEntityContent(
			cashedContent.content.entityContent.layout
				? {
						main: cashedContent.content.entityContent.main,
						layout: cashedContent.content.entityContent.layout,
				  }
				: {
						main: cashedContent.content.entityContent.main,
				  },
		);
		setEntityProps(cashedContent.content.entityProps);
	};

	/* 	const getEntityContent = useCallback(async () => {
		if (cashedContent?.isLoading) {
			waitForCache();
			return;
		} else if (cashedContent?.isLoading === false) {
			// todo store content
			//setEntityProps(cachedData);
			return;
		}

		// store value to cache to show this is waiting to be resolved
		contentCache.set(cacheKey, {
			url: cashedContent?.url ?? "#",
			isLoading: true,
		});

		// fetch data
		const request = await fetch("/wp-json/bring/dynamic/content", {
			method: "POST",
			body: JSON.stringify({entityId: entity.id, entityType: entity.type}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await request.json();
		if (data.data === null) {
			return;
		}

		setEntityProps(data.data);
		dynamicCache.set(cacheKey, data.data);
	}, [cacheKey, waitForCache]);

	useEffect(() => {
		if (entityContent?.url) {
			getEntityContent();
		} else {
			console.error(
				`Entity content is not found with the given cache key: ${cacheKey}`,
			);
		}
	}, [cacheKey, isWaiting]); */

	return {
		url: cashedContent?.url ?? "#",
		query: getEntityContent,
		set: setContent,
	};
};
