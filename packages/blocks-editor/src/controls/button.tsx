import { Button } from "@wordpress/components"
import React from "react"

type SetToDefaultButtonProps = {
	onClick: () => void
}

export const SetToDefaultButton = ({ onClick }: SetToDefaultButtonProps) => {
	return (
		<Button
			onClick={onClick}
			style={{
				padding: 0,
				height: "unset",
				color: "rgb(117, 117, 117)",
			}}
		>
			Set to default
		</Button>
	)
}
