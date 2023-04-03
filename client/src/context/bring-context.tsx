import React, {useContext, useState} from "react";
import type {FC} from "react";
import {BringContextType, EntityContent, EntityProps} from "../types";

declare global {
	// Interface is needed to augment global `Window`
	interface Window {
		bringCache: BringContextType;
	}
}

export const BringContext = React.createContext<
	BringContextType & {
		setEntityContent: (entityContent: EntityContent) => void;
		setEntityProps: (entityProps: EntityProps) => void;
		componentMap: Map<string, FC<any>>;
	}
>({
	...window.bringCache,
	setEntityContent: () => {},
	setEntityProps: () => {},
	componentMap: new Map<string, FC<any>>(),
});

export const BringContextProvider: FC<{
	children: React.ReactNode;
	componentMap: Map<string, FC<any>>;
}> = ({children, componentMap}) => {
	const siteProps = window.bringCache.siteProps;
	const [entityContent, setEntityContent] = useState(
		window.bringCache.entityContent,
	);
	const [entityProps, setEntityProps] = useState(window.bringCache.entityProps);
	const dynamicCache = new Map<string, any>(
		Object.entries(window.bringCache.dynamicCache),
	);
	const contentCache = new Map<string, any>(
		Object.entries(window.bringCache.contentCache),
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
