declare module "@wordpress/data" {
	function select(key: string): {
		getCurrentPostId: () => string
		isSavingPost: () => boolean
		isAutosavingPost: () => boolean
		getEditedPostAttribute: (key: string) => { [key: string]: Array<unknown> }
		getCurrentPostType: () => string
	}
	function dispatch(key: string): {
		editPost: (meta: { [key: string]: unknown }) => void
	}
	function subscribe(arg0: () => void)
}
