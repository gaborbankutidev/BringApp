import type { FC } from "react"
import React from "react"

export const Debug: FC<any> = ({ value, ...props }) => (
	<pre {...props}>{JSON.stringify(value, null, 2)}</pre>
)
