import React from "react";
import type {FC, ReactNode} from "react";
import {createRoot, hydrateRoot} from "react-dom/client";
import {renderToString} from "react-dom/server";
import {BringContextProvider} from "./context";
import {Cache, Page, postContent} from "./components";

declare global {
	// Interface is needed to augment global `Window`
	interface Window {
		bringRenderToString: () => string;
	}
}

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

		const BringContent = (
			<BringContextProvider componentMap={componentMap}>
				<Wrapper>
					<Cache />
				</Wrapper>
			</BringContextProvider>
		);

		root.render(BringContent);

		window.bringRenderToString = () => renderToString(BringContent);
	}

	// init page root
	const bringContent = document.getElementById("bringContent");
	if (bringContent) {
		const BringContent = (
			<BringContextProvider componentMap={componentMap}>
				<Wrapper>
					<Page />
				</Wrapper>
			</BringContextProvider>
		);

		if (bringContent.getAttribute("data-disable-hydration")) {
			const root = createRoot(bringContent);
			root.render(BringContent);
		} else {
			hydrateRoot(bringContent, BringContent);
		}

		window.bringRenderToString = () => renderToString(BringContent);
	}
}
