"use client"

import { useState } from "react"
import { action } from "./action"

export const Preview = () => {
	const [content, setContent] = useState(<div>Initial</div>)

	return (
		<div>
			<h1>Preview test</h1>
			<button onClick={() => setContent(<div>Updated with sample</div>)}>Update with sample</button>
			<br />
			<button
				onClick={() => {
					action()
						.then((content) => setContent(content))
						.catch(console.error)
				}}
			>
				Update from server
			</button>
			<div className="border p-4">{content}</div>
		</div>
	)
}
