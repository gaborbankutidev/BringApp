"use client"

import Button from "@/components/button"
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
 * This is a test and sample component that aims to use and present most of the features of Bring App
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
		<div
			{...props}
			className={cn("rounded-lg border border-gray-200 bg-white p-6 shadow-sm", props.className)}
		>
			<h2 className="text-xl mb-4 font-semibold text-gray-900">Basic Sample block</h2>
			<div className="mb-4 flex flex-col gap-4">
				<p className="text-gray-700">
					<span className="font-medium">Bool:</span> {bool ? "True" : "False"}
				</p>
				<p className="text-gray-700">
					<span className="font-medium">String:</span> {string}
				</p>
				{number && (
					<p className="text-gray-700">
						<span className="font-medium">Number:</span> {number}
					</p>
				)}
				<p className="text-gray-700">
					<span className="font-medium">State value:</span> {state}
					<button
						onClick={() => setState((state) => state + 1)}
						className="text-sm ml-2 rounded bg-gray-400 px-2 py-1 text-white transition-colors hover:bg-gray-600"
					>
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
			<div
				className={cn(
					"mb-4 flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4",
					containerClassName
				)}
			>
				<div className="h-12 w-12 rounded bg-purple-400 shadow-sm" />
				<div className="h-12 w-12 rounded bg-purple-400 shadow-sm" />
				<div className="h-12 w-12 rounded bg-purple-400 shadow-sm" />
			</div>
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-4">{children}</div>
		</div>
	)
}

export default Basic
