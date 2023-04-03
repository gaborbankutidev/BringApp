import React from "react";
import type {FC} from "react";
import {createRoot} from "react-dom/client";
import {postContent} from "./components/post-content";
import {BringContextProvider} from "./context/bring-context";
import {Cache} from "./cache";
import {Page} from "./page";

export function clientInit(
	componentList: {componentName: string; Component: FC<any>}[],
	Wrapper: FC<{children: React.ReactNode}> = React.Fragment,
) {
	const componentMap = new Map<string, FC<any>>();
	componentList.push(postContent);
	componentList.forEach(({Component, componentName}) =>
		componentMap.set(componentName, Component),
	);

	const bringCache = document.getElementById("bringCache");
	if (bringCache) {
		const root = createRoot(bringCache);
		root.render(
			<BringContextProvider componentMap={componentMap}>
				{React.createElement(Wrapper, null, <Cache />)}
			</BringContextProvider>,
		);
	}

	const bringContent = document.getElementById("bringContent");
	if (bringContent) {
		const root = createRoot(bringContent);
		root.render(
			<BringContextProvider componentMap={componentMap}>
				{React.createElement(Wrapper, null, <Page />)}
			</BringContextProvider>,
		);
	}
}
