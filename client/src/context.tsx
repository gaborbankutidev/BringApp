import React, {
	useState,
	useEffect,
	useContext,
	useMemo,
	useCallback,
} from "react";
import type {FC, ReactNode} from "react";
import {BringContextType} from "./types";

declare global {
	// Interface is needed to augment global `Window`
	interface Window {
		bringCache: BringContextType;
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
}> = ({children, componentMap = new Map()}) => {
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
			const [url, queryString] = href.split("?");
			const params = new URLSearchParams(queryString);
			params.append("bringCSR", "1");
			try {
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

				if (!data.bringCSR) {
					throw "wrong data";
				}

				setEntityContent(data.entityContent);
				setEntityProps(data.entityProps);
				document.body.scrollTop = 0; // For Safari
				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
				history.pushState(data, "", href);
			} catch (error) {
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
