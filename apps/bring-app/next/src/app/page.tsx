import Link from "next/link";
import Post from "./post";

export default function Home() {
	return (
		<>
			{/* <Main /> */}

			<div className="w-screen h-screen flex items-center relative">
				<div className="h-full pl-10 w-1/2 text-gray-300">
					<p className="uppercase tracking-wide text-20">
						Welcome to your new journey with
					</p>
					<h1 className="tracking-tight font-bold text-[90px] leading-[90px] mb-8">
						<span className="text-red-600">Bring</span>{" "}
						<span className="text-white">App</span>
					</h1>

					<p className="text-gray-200 mb-4">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut minus
						perferendis tenetur et eum magni veniam odio. Explicabo consectetur
						adipisci necessitatibus. Labore facilis, dolore tempora aspernatur
						reprehenderit nihil vitae rerum!
					</p>

					<div className="flex gap-4 mb-24">
						<button className="text-white text-18 bg-gradient-to-r from-60% from-red-600 to-red-900 rounded-full py-2 px-8 transition-all duration-300">
							Get Started
						</button>

						<Link
							target="_blank"
							href={process.env.NEXT_PUBLIC_WP_BASE_URL ?? "#"}
							className="text-red-600 text-18 outline outline-red-600 -outline-offset-2 rounded-full py-2 px-8"
						>
							Open WordPress admin
						</Link>
					</div>

					<Post />
				</div>

				<div className="radial-gradient absolute -z-10 h-[160vh] aspect-square"></div>
				<div className="bg-black absolute -z-10 h-[140vh] rounded-full aspect-square"></div>
			</div>
		</>
	);
}
