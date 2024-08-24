import {dispatch, select, subscribe} from "@wordpress/data";
import {BringNode} from "./types";

export class Editor {
	private static instance: Editor;

	private blocks: BringNode[] = [];

	private constructor() {
		this.disableReusableBlocks();
	}

	static init() {
		if (!Editor.instance) {
			Editor.instance = new Editor();
		}

		return this.instance;
	}

	private disableReusableBlocks() {
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
}
