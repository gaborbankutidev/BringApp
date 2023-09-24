import React, {
	useState,
	useEffect,
	useContext,
	useMemo,
	useCallback,
} from "react";
import type {FC, ReactNode} from "react";
import {BringContextType} from "./types";
import {updateRankMathHeader} from "./utils";

declare global {
	// Interface is needed to augment global `Window`
	interface Window {
		bringCache: BringContextType;
	}
}

function scrollToElement(id: string, retries: number = 10) {
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({behavior: "smooth"});
	} else if (retries > 0) {
		setTimeout(function () {
			scrollToElement(id, retries - 1);
		}, 100);
	}
}

const BringContext = React.createContext<BringContextType>({
	...window.bringCache,
	navigate: () => {},
	componentMap: new Map<string, FC<any>>(),
});

export const BringContextProvider: FC<{
	children: ReactNode;
	componentMap?: Map<string, FC<any>>;
	rankMath?: boolean;
}> = ({children, componentMap = new Map(), rankMath = false}) => {
	const siteProps = useMemo(() => window.bringCache.siteProps, []);

	const [entityContent, setEntityContent] = useState(
		window.bringCache.entityContent,
	);
	const [entityProps, setEntityProps] = useState(window.bringCache.entityProps);

	const dynamicCache = useMemo(
		() => new Map<string, any>(Object.entries(window.bringCache.dynamicCache)),
		[],
	);

	const navigate = useCallback(
		async (href: string) => {
			// split url
			const [_href, scrollToId] = href.split("#");
			const [url, queryString] = _href.split("?");

			// append bringCSR=1 to query string
			const params = new URLSearchParams(queryString);
			params.append("bringCSR", "1");

			try {
				// fetch data
				const response = await fetch(`${url}?${params.toString()}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.status !== 200) {
					throw `Failed. Response code: ${response.status}`;
				}

				const data = (await response.json()) as {
					bringCSR: boolean;
					entityContent: BringContextType["entityContent"];
					entityProps: BringContextType["entityProps"];
				};

				// check if data is valid
				if (!data.bringCSR) {
					throw "wrong data";
				}

				// set date to state and trigger re-render
				rankMath && url && updateRankMathHeader(url);
				setEntityContent(data.entityContent);
				setEntityProps(data.entityProps);

				// add to history
				history.pushState(data, "", href);

				// scroll to top or the element
				if (scrollToId) {
					scrollToElement(scrollToId);
				} else {
					document.body.scrollTop = 0; // For Safari
					document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
				}
			} catch (error) {
				// redirect to href on error
				window.location.href = href;
				console.error(error);
			}
		},
		[setEntityContent, setEntityProps],
	);

	useEffect(() => {
		history.replaceState({bringCSR: true, entityContent, entityProps}, "");
		window.onpopstate = function (event) {
			if (!event?.state?.bringCSR) {
				return;
			}
			rankMath && updateRankMathHeader(window.location.href);
			setEntityContent(event.state.entityContent);
			setEntityProps(event.state.entityProps);
		};
	}, []);

	return (
		<BringContext.Provider
			value={{
				siteProps,
				entityContent,
				entityProps,
				dynamicCache,
				componentMap,
				navigate,
			}}
		>
			{children}
		</BringContext.Provider>
	);
};

export const useBringContext = () => {
	return useContext(BringContext);
};
