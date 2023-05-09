import React, {useState, createContext, useContext, useMemo} from "react";
import type {FC, ReactNode} from "react";
import {BringContextType} from "./types";

declare global {
	// Interface is needed to augment global `Window`
	interface Window {
		bringCache: BringContextType;
	}
}

const BringContext = createContext<BringContextType>({
	...window.bringCache,
	setEntityContent: () => {},
	setEntityProps: () => {},
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

	const contentCache = useMemo(
		() => new Map<string, any>(Object.entries(window.bringCache.contentCache)),
		[],
	);

	return (
		<BringContext.Provider
			value={{
				siteProps,
				entityContent,
				setEntityContent,
				entityProps,
				setEntityProps,
				dynamicCache,
				contentCache,
				componentMap,
			}}
		>
			{children}
		</BringContext.Provider>
	);
};

export const useBringContext = () => {
	return useContext(BringContext);
};
