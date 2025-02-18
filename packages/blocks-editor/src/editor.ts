import { dispatch, select, subscribe } from "@wordpress/data"
import { BlockConfig, registerBringBlock } from "./blocks"
import { postContentConfig } from "./components/post-content"
import { BringNode, WpBlock } from "./types"

declare global {
	// Interface is needed to augment global `Window`
	interface Window {
		jwt: { token: string } // FIXME move this to a cookie
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
 * @method registerBlocks - method to register all blocks
 *
 */
export class Editor {
	private static instance: Editor

	private jwtToken: string
	private isSaving: boolean
	private blockList: BlockConfig<any>[] // eslint-disable-line @typescript-eslint/no-explicit-any

	/**
	 * Private constructor to initialize the Editor class.
	 * @param wpBaseURL - the base URL of the WordPress site
	 * @param jwtToken - the JWT token to authenticate the user
	 * @param blockList - the list of block configurations
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private constructor(blockList: BlockConfig<any>[]) {
		this.jwtToken = window.jwt.token // FIXME move this to a cookie
		this.isSaving = false
		this.blockList = blockList

		this.disableReusableBlocks()
		this.registerBlocks()
		this.subscribeToSaveEvent()
	}

	/**
	 * Static method to initialize the singleton instance of the Editor class.
	 *
	 * @param wpBaseURL - the base URL of the WordPress site
	 * @param jwtToken - the JWT token to authenticate the user
	 * @param blockList - the list of block configurations
	 *
	 * @returns the instance of the Editor class
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static init(blockList: BlockConfig<any>[]) {
		console.log("🚀 Launching Bring Editor...")
		if (!Editor.instance) {
			Editor.instance = new Editor(blockList)
		} else {
			Editor.instance.blockList = blockList
			Editor.instance.jwtToken = window.jwt.token
		}
		console.log("🚀 Bring Editor Launched! Happy editing!")
		return this.instance
	}

	/**
	 * Method to disable the reusable blocks.
	 * @returns void
	 */
	private disableReusableBlocks() {
		dispatch("core/block-editor").updateSettings({
			// @ts-expect-error - this does in fact exist
			__experimentalReusableBlocks: [],
		})

		subscribe(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const settings = select("core/block-editor").getSettings() as any
			if (
				settings.__experimentalReusableBlocks &&
				settings.__experimentalReusableBlocks.length > 0
			) {
				dispatch("core/block-editor").updateSettings({
					// @ts-expect-error - this does in fact exist
					__experimentalReusableBlocks: [],
				})
			}
		})
	}

	/**
	 * Method to subscribe to the save event.
	 * It listens to the save event and sends the content to the backend.
	 * @returns void
	 */
	private subscribeToSaveEvent() {
		subscribe(() => {
			try {
				const isSavingPost = select("core/editor")?.isSavingPost() ?? false
				const isAutosavingPost = select("core/editor")?.isAutosavingPost() ?? false

				if (this.isSaving && !isSavingPost && !isAutosavingPost) {
					this.update()
					this.isSaving = false
				} else if (isSavingPost && !isAutosavingPost) {
					this.isSaving = true
				}
			} catch (e) {
				console.error(e)
			}
		})
	}

	/**
	 * Method to send the content to the backend.
	 * It sends the content to the backend to be saved.
	 * @returns void
	 */
	private update() {
		const contentObject = this.parseBlocks(select("core/block-editor").getBlocks())
		const entityId = select("core/editor").getCurrentPostId()

		fetch("/wp-json/bring/editor/save", {
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
					console.error("🚀 There was an issue while saving!", res)
				} else {
					console.log("🚀 Content saved successfully!")
				}
			})
			.catch((err) => {
				console.error("🚀 There was an issue while saving!", err)
			})
	}

	/**
	 * Method to parse the blocks to a format that can be sent to the backend.
	 * @param blocks - the blocks to be parsed
	 * @returns the parsed blocks
	 */
	private parseBlocks(blocks: WpBlock[]) {
		const nodes: BringNode[] = []
		for (const block of blocks) {
			const blockConfig = this.blockList.find((b) => b.blockName === block.name)
			if (!blockConfig) {
				console.error(`🚀 Block '${block.name}' not found in the block list and will not be saved!`)
				continue
			}

			const node: BringNode = {
				key: block.clientId,
				blockName: block.name,
				attributes: block.attributes,
				children: [],
			}

			if (block.innerBlocks.length) {
				node.children = this.parseBlocks(block.innerBlocks)
			}
			nodes.push(node)
		}
		return nodes
	}

	/**
	 * Method to register all the blocks.
	 * @returns void
	 */
	private registerBlocks() {
		this.blockList.push(postContentConfig)
		this.blockList.map((blockConfig) => {
			registerBringBlock(blockConfig)
		})
	}
}
