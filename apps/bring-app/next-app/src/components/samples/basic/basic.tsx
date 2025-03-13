"use client"

import Button from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

export type BasicProps = {
	bool: boolean
	string: string
	number?: number
	button?: {
		label: string
		url: string
		className?: string
		id?: string
	}
	containerClassName?: string
} & React.HTMLProps<HTMLDivElement>

/**
 * This is a test and sample component that aims to use and present most of the features of bring App
 */
const Basic = ({
	bool,
	string,
	number,
	button,
	containerClassName,
	children,
	...props
}: BasicProps) => {
	// The component can be a client component and handle states
	const [state, setState] = useState(0)

	return (
		<div {...props}>
			<h2 className="mb-4">Basic Sample block</h2>
			<div className="mb-4 flex flex-col gap-4">
				<p>Bool: {bool ? "True" : "False"}</p>
				<p>String: {string}</p>
				{number && <p>Number: {number}</p>}
				<p>
					State value: {state} |{" "}
					<button onClick={() => setState((state) => state + 1)} className="border">
						+1
					</button>
				</p>
				{button && (
					<Button asChild>
						<Link href={button.url} target="_blank">
							{button.label}
						</Link>
					</Button>
				)}
			</div>
			<div className={cn("mb-4 flex gap-3 border p-4", containerClassName)}>
				<div className="h-12 w-12 bg-purple-400" />
				<div className="h-12 w-12 bg-purple-400" />
				<div className="h-12 w-12 bg-purple-400" />
			</div>
			<div className="border bg-gray-300 p-4">{children}</div>
		</div>
	)
}

export default Basic
