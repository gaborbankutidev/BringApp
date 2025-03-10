"use client"

import { type ReactNode, useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

export default function Slider({
	children,
	numberOfSlides,
}: {
	children: ReactNode
	numberOfSlides: number
}) {
	const [currentSlide, setCurrentSlide] = useState(0)

	const nextSlide = () => {
		setCurrentSlide((currentSlide + 1) % (numberOfSlides - 1))
	}

	const previousSlide = () => {
		setCurrentSlide(
			currentSlide <= 0 ? Math.max(numberOfSlides - 2, 0) : Math.max(currentSlide - 1, 0)
		)
	}

	return (
		<div className="relative h-full w-full overflow-hidden">
			{currentSlide !== 0 && (
				<div className="from-gray-950 absolute left-0 top-0 z-10 h-full w-4 bg-gradient-to-r to-transparent" />
			)}
			{numberOfSlides > 2 && (
				<div className="from-gray-950 absolute right-0 top-0 z-10 h-full w-4 bg-gradient-to-l to-transparent" />
			)}

			<div
				className="mb-4 flex gap-4 transition-all duration-300"
				style={{
					transform: `translateX(-${currentSlide * 50}%)`,
				}}
			>
				{children}
			</div>

			{numberOfSlides > 2 && (
				<>
					<button onClick={previousSlide}>
						<BiChevronLeft
							size={32}
							className="text-gray-200 transition-all duration-300 hover:text-purple-600"
						/>
					</button>
					<button onClick={nextSlide}>
						<BiChevronRight
							size={32}
							className="text-gray-200 transition-all duration-300 hover:text-purple-600"
						/>
					</button>
				</>
			)}
		</div>
	)
}
