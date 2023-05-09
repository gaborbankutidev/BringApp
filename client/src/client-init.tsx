import React from "react";
import type {FC, ReactNode} from "react";
import {createRoot} from "react-dom/client";
import {BringContextProvider} from "./context";
import {Cache, Page, postContent} from "./components";

export function clientInit(
	componentList: {componentName: string; Component: FC<any>}[],
	Wrapper: FC<{children: ReactNode}> = React.Fragment,
) {
	const componentMap = new Map<string, FC<any>>();

	// Add build in components
	componentList.push(postContent);

	// Add component list
	componentList.forEach(({Component, componentName}) =>
		componentMap.set(componentName, Component),
	);

	// init cache root
	const bringCache = document.getElementById("bringCache");
	if (bringCache) {
		const root = createRoot(bringCache);

		root.render(
			<BringContextProvider componentMap={componentMap}>
				<Wrapper>
					<Cache />
				</Wrapper>
			</BringContextProvider>,
		);
	}

	// init page root
	const bringContent = document.getElementById("bringContent");
	if (bringContent) {
		const root = createRoot(bringContent);

		root.render(
			<BringContextProvider componentMap={componentMap}>
				<Wrapper>
					<Page />
				</Wrapper>
			</BringContextProvider>,
		);
	}
}
