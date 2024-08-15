"use client";
import {ReactNode, useState} from "react";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";

export default function Slider({
	children,
	numberOfSlides,
}: {
	children: ReactNode;
	numberOfSlides: number;
}) {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((currentSlide + 1) % (numberOfSlides - 1));
	};

	const previousSlide = () => {
		setCurrentSlide(
			currentSlide <= 0
				? Math.max(numberOfSlides - 2, 0)
				: Math.max(currentSlide - 1, 0),
		);
	};

	return (
		<div className="relative w-full h-full overflow-hidden">
			{currentSlide !== 0 && (
				<div className="bg-gradient-to-r from-gray-950 to-transparent absolute top-0 left-0 h-full w-4 z-10" />
			)}
			{numberOfSlides > 2 && (
				<div className="bg-gradient-to-l from-gray-950 to-transparent absolute top-0 right-0 h-full w-4 z-10" />
			)}

			<div
				className="flex gap-4 transition-all duration-300 mb-4"
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
							className="text-gray-200 hover:text-purple-600 transition-all duration-300"
						/>
					</button>
					<button onClick={nextSlide}>
						<BiChevronRight
							size={32}
							className="text-gray-200 hover:text-purple-600 transition-all duration-300"
						/>
					</button>
				</>
			)}
		</div>
	);
}
