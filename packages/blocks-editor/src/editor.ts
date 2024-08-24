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
		// @ts-expect-error - this does in fact exist
		__experimentalReusableBlocks: [],
	});

	// Erase the existence of any reusable blocks.
	subscribe(() => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const settings = select("core/block-editor").getSettings() as any;
		if (
			settings.__experimentalReusableBlocks &&
			settings.__experimentalReusableBlocks.length > 0
		) {
			dispatch("core/block-editor").updateSettings({
				// @ts-expect-error - this does in fact exist
				__experimentalReusableBlocks: [],
			});
		}
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function editorInit(blockList: BlockConfig<any>[], wpBaseURL: string = "") {
	if (window.bringContent) {
		console.error("Double init bring");
		return;
	}

	disableReusableBlocks();

	// register bring blocks
	blockList.push(postContentConfig);
	blockList.map((blockConfig) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	// @ts-expect-error - this does in fact exist
	window.getEditorContentObject = getEditorContentObject;
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
	const parentNode = bringFindBlockNode(parentKey, window.bringContent);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEditorToBringNode(blocks: any) {
	const nodes = [];
	for (const block of blocks) {
		// TODO solve this in a better way
		const name =
			block.name.split("/").pop().charAt(0).toUpperCase() +
			block.name.split("/").pop().slice(1);

		const node: BringNode = {
			key: block.clientId,
			component: name,
			props: block.attributes, // TODO omit key bringStyles and parentKey
			children: [],
		};

		if (block.innerBlocks.length) {
			node.children = parseEditorToBringNode(block.innerBlocks);
		}

		nodes.push(node);
	}

	return nodes;
}

function getEditorContentObject() {
	const blocks = select("core/block-editor").getBlocks();
	const parsed = parseEditorToBringNode(blocks);
	console.log(parsed);
	return parsed;
}

function bringUpdate(wpBaseURL: string) {
	if (!window.bringContent) {
		return;
	}

	const content = getEditorContentObject();

	fetch(`${wpBaseURL}/wp-json/bring/editor/save`, {
		method: "POST",
		headers: {
			Authorization: window.jwt.token,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			contentObject: content,
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
