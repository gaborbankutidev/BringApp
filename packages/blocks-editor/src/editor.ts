import {dispatch, select, subscribe} from "@wordpress/data";
import {BlockConfig, registerBringBlock} from "./blocks";
import {postContentConfig} from "./components/post-content";
import type {BringNode} from "./types";

declare global {
	// Interface is needed to augment global `Window`
	interface Window {
		// editor
		bringContent: BringNode[];
		jwt: {token: string};

		// Magical bug by WP so declared here :)
		wp: {
			data: {
				select: (storeNameOrDescriptor: string) => {
					getBlockParents: (arg0: string) => string[];
				};
			};
		};
	}
}

function disableReusableBlocks() {
	// remove reusable blocks
	dispatch("core/block-editor").updateSettings({
		// @ts-ignore
		__experimentalReusableBlocks: [],
	});

	// Erase the existence of any reusable blocks.
	subscribe(() => {
		const settings = select("core/block-editor").getSettings() as any;
		if (
			settings.__experimentalReusableBlocks &&
			settings.__experimentalReusableBlocks.length > 0
		) {
			dispatch("core/block-editor").updateSettings({
				// @ts-ignore
				__experimentalReusableBlocks: [],
			});
		}
	});
}

export function editorInit(blockList: BlockConfig<any>[], wpBaseURL: string = "") {
	if (window.bringContent) {
		console.error("Double init bring");
		return;
	}

	disableReusableBlocks();

	// register bring blocks
	blockList.push(postContentConfig);
	blockList.map((blockConfig) => {
		registerBringBlock<any>(blockConfig);
	});

	// set an elegant timeout for waiting for WP because no `saved` event or documentation is available!
	setTimeout(() => {
		window.bringContent = [];

		// subscribe to save event
		subscribe(function () {
			const isSavingPost = select("core/editor").isSavingPost();
			const isAutosavingPost = select("core/editor").isAutosavingPost();

			if (isSavingPost && !isAutosavingPost) {
				console.log("Save");
				setTimeout(() => {
					bringUpdate(wpBaseURL);
				}, 1000);
			}
		});
		console.log("BringBlocks Editor initialized!");
	}, 1000);
}

// recursive search in bring store to find a node
function bringFindBlockNode(key: string, nodes: BringNode[]): BringNode | null {
	for (const node of nodes) {
		if (key === node.key) {
			return node;
		}
		if (node.children?.length) {
			const result = bringFindBlockNode(key, node.children);
			if (result) {
				return result;
			}
		}
	}

	return null;
}

// stores bring node to window.bring.content
export function bringStoreBlockNode(parentKey: string, node: BringNode) {
	// return if not initialized
	if (!window.bringContent) {
		return;
	}

	// find if block is already stored and reset bring.content
	if (bringFindBlockNode(node.key, window.bringContent)) {
		if (parentKey) {
			alert("There was an issue while saving. Reload the page and save again!");
		}
		window.bringContent = [];
	}

	// check if top level node and push to the and of array
	if (!parentKey) {
		window.bringContent.push(node);
		return;
	}

	// push to the children array of the parent node
	let parentNode = bringFindBlockNode(parentKey, window.bringContent);
	if (parentNode === null) {
		console.error("Parent node", parentNode);
		console.error("Parent key", parentKey);
		console.error("UNREACHABLE-2 ERROR");
		return;
	}
	if (!parentNode.children) {
		parentNode.children = [];
	}
	parentNode.children.push(node);
}

function bringUpdate(wpBaseURL: string) {
	if (!window.bringContent) {
		return;
	}

	fetch(`${wpBaseURL}/wp-json/bring/editor/save`, {
		method: "POST",
		headers: {
			Authorization: window.jwt.token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			contentObject: window.bringContent,
			entityId: select("core/editor").getCurrentPostId(),
		}),
	})
		.then((res) => {
			if (res.status !== 200) {
				alert("There was an issue while saving!");
				console.error(res);
			} else {
				console.log("Save is completed");
			}
		})
		.catch((err) => {
			alert("There was an issue while saving!");
			console.error(err);
		});
}
