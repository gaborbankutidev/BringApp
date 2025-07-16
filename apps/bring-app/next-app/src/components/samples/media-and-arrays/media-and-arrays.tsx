import Button from "@/components/button"
import { cn } from "@/lib/utils"
import Image, { type ImageProps as NextImageProps } from "next/image"
import Link from "next/link"

type ImageProps = Pick<NextImageProps, "src" | "alt">

export type MediaAndArraysProps = {
	image?: ImageProps
	file?: string
	list?: string[]

	gallery?: ImageProps[]
	galleryWithCaption?: {
		image: ImageProps
		caption?: string
	}[]
} & Omit<React.HTMLProps<HTMLDivElement>, "children" | "list">

const MediaAndArrays = ({
	image,
	file,
	list,
	gallery,
	galleryWithCaption,
	className,
	...props
}: MediaAndArraysProps) => {
	return (
		<div
			className={cn("rounded-lg border border-gray-200 bg-white p-6 shadow-sm", className)}
			{...props}
		>
			<h2 className="mb-4 font-semibold text-gray-900">Media and Arrays Sample block</h2>
			<div className="mb-4">
				<h3 className="mb-2 font-semibold text-gray-900">Image</h3>
				{image ? (
					<Image {...image} width={1200} height={800} className="max-w-[320px]" /> // eslint-disable-line jsx-a11y/alt-text
				) : (
					<div>No image</div>
				)}
			</div>
			<div className="mb-4">
				<h3 className="mb-2 font-semibold text-gray-900">File</h3>
				{file ? (
					<Button>
						<Link href={file} download>
							Download file
						</Link>
					</Button>
				) : (
					<div>No file</div>
				)}
			</div>
			<div className="mb-4">
				<h3 className="mb-2 font-semibold text-gray-900">List</h3>
				{list && list.length > 0 ? (
					<ul className="list-inside list-disc">
						{list.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				) : (
					<div>No list</div>
				)}
			</div>
			<div className="mb-4">
				<h3 className="mb-2 font-semibold text-gray-900">Gallery</h3>
				{gallery && gallery.length > 0 ? (
					<div className="flex flex-wrap gap-4">
						{gallery.map((image, index) => (
							<Image key={index} {...image} width={1200} height={800} className="max-w-[320px]" /> // eslint-disable-line jsx-a11y/alt-text
						))}
					</div>
				) : (
					<div>No gallery</div>
				)}
			</div>
			<div className="mb-4">
				<h3 className="mb-2 font-semibold text-gray-900">Gallery with Caption</h3>
				{galleryWithCaption && galleryWithCaption.length > 0 ? (
					<div className="flex flex-wrap gap-4">
						{galleryWithCaption.map(({ image, caption }, index) => (
							<div key={index}>
								{/* eslint-disable-next-line jsx-a11y/alt-text */}
								<Image {...image} width={1200} height={800} className="max-w-[320px]" />{" "}
								<p className="text-sm mt-1 text-gray-500">{caption}</p>
							</div>
						))}
					</div>
				) : (
					<div>No gallery with caption</div>
				)}
			</div>
		</div>
	)
}

export default MediaAndArrays
