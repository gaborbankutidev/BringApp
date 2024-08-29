import {dispatch, select, subscribe} from "@wordpress/data";
import {BlockConfig, objectAttributeSource, stringAttributeSource} from "./blocks";
import {makeEdit} from "./blocks/make-edit";
import {makeSave} from "./blocks/make-save";
import {postContentConfig} from "./components/post-content";
import {BringStylesDefaultValue} from "./styles/utils";
import {BringNode, Obj, WpBlock} from "./types";

declare global {
	// Interface is needed to augment global `Window`
	interface Window {
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

/**
 * Editor class that handles the saving of the content to the backend.
 * It listens to the save event and sends the content to the backend.
 * It also disables the reusable blocks.
 * It is a singleton class.
 *
 * @class Editor
 * @constructor - private constructor
 *
 * @property wpBaseURL - the base URL of the WordPress site
 * @property jwtToken - the JWT token to authenticate the user
 * @property isSaving - a flag to check if the editor is saving
 * @property blockList - the list of block configurations
 *
 * @method init - static method to initialize the singleton instance
 * @method disableReusableBlocks - method to disable the reusable blocks
 * @method subscribeToSaveEvent - method to subscribe to the save event
 * @method update - method to send the content to the backend
 * @method parseBlocks - method to parse the blocks to a format that can be sent to the backend
 * @method registerBlock - method to register a block
 * @method registerBlocks - method to register all blocks
 */
export class Editor {
	private static instance: Editor;

	private wpBaseURL: string;
	private jwtToken: string;
	private isSaving: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private blockList: BlockConfig<any>[];

	/**
	 * Private constructor to initialize the Editor class.
	 * @param wpBaseURL - the base URL of the WordPress site
	 * @param jwtToken - the JWT token to authenticate the user
	 * @param blockList - the list of block configurations
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private constructor(wpBaseURL: string, jwtToken: string, blockList: BlockConfig<any>[]) {
		this.wpBaseURL = wpBaseURL;
		this.jwtToken = jwtToken;
		this.isSaving = false;
		this.blockList = blockList;

		this.disableReusableBlocks();
		this.registerBlocks();
		this.subscribeToSaveEvent();
	}

	/**
	 * Static method to initialize the singleton instance of the Editor class.
	 * @param wpBaseURL - the base URL of the WordPress site
	 * @param jwtToken - the JWT token to authenticate the user
	 * @param blockList - the list of block configurations
	 * @returns the instance of the Editor class
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static init(wpBaseURL: string, jwtToken: string, blockList: BlockConfig<any>[]) {
		if (!Editor.instance) {
			Editor.instance = new Editor(wpBaseURL, jwtToken, blockList);
		}
		return this.instance;
	}

	/**
	 * Method to disable the reusable blocks.
	 * @returns void
	 */
	private disableReusableBlocks() {
		dispatch("core/block-editor").updateSettings({
			// @ts-expect-error - this does in fact exist
			__experimentalReusableBlocks: [],
		});

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

	/**
	 * Method to subscribe to the save event.
	 * It listens to the save event and sends the content to the backend.
	 * @returns void
	 */
	private subscribeToSaveEvent() {
		subscribe(() => {
			const isSavingPost = select("core/editor").isSavingPost();
			const isAutosavingPost = select("core/editor").isAutosavingPost();

			if (this.isSaving && !isSavingPost && !isAutosavingPost) {
				this.update();
				this.isSaving = false;
			} else if (isSavingPost && !isAutosavingPost) {
				this.isSaving = true;
			}
		});
	}

	/**
	 * Method to send the content to the backend.
	 * It sends the content to the backend to be saved.
	 * @returns void
	 */
	private update() {
		const contentObject = this.parseBlocks(select("core/block-editor").getBlocks());
		const entityId = select("core/editor").getCurrentPostId();

		fetch(`${this.wpBaseURL}/wp-json/bring/editor/save`, {
			method: "POST",
			headers: {
				Authorization: this.jwtToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contentObject,
				entityId,
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

	/**
	 * Method to parse the blocks to a format that can be sent to the backend.
	 * @param blocks - the blocks to be parsed
	 * @returns the parsed blocks
	 */
	private parseBlocks(blocks: WpBlock[]) {
		const nodes: BringNode[] = [];
		for (const block of blocks) {
			// FIXME solve block name parsing better, this is not safe
			// and works on the assumption that we follow a certain pattern with the block name
			// but this is not enforced in any way
			const blockName = block.name.split("/").pop() ?? "";
			const name = blockName.charAt(0).toUpperCase() + blockName.slice(1);

			// remove attributes that are not needed to be saved
			delete block.attributes.key;
			delete block.attributes.parentKey;
			delete block.attributes.bringStyles;

			const node: BringNode = {
				key: block.clientId,
				component: name,
				props: block.attributes,
				children: [],
			};

			if (block.innerBlocks.length) {
				node.children = this.parseBlocks(block.innerBlocks);
			}

			nodes.push(node);
		}

		return nodes;
	}

	/**
	 * Method to register a block.
	 * @param config - the configuration of the block
	 * @returns void
	 */
	private registerBlock<Props extends Obj>(config: BlockConfig<Props>) {
		const title = config.title ? config.title : config.componentName;

		// @ts-expect-error: Expect error here because Wordpress's `registerBlockType` types are so complicated TS can't infer the correct types
		registerBlockType(`bring/${title.toLowerCase()}`, {
			title,
			description: config.description ?? `${title} block by Bring`,
			category: "widgets", // todo custom category
			icon: config.icon ?? "block-default",
			supports: {
				html: false,
			},
			attributes: {
				...config.attributes,
				id: stringAttributeSource(),
				bringStyles: objectAttributeSource(BringStylesDefaultValue),
			},
			example: config.previewAttributes && {
				attributes: config.previewAttributes,
			},
			edit: makeEdit<Props>(config),
			save: makeSave<Props>(config), // refactor save hooks and use InnedBlock instead
		});
	}

	/**
	 * Method to register all the blocks.
	 * @returns void
	 */
	private registerBlocks() {
		this.blockList.push(postContentConfig);
		this.blockList.map((blockConfig) => {
			this.registerBlock(blockConfig);
		});
	}
}
