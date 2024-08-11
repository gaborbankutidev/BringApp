import Post from "./post";

export default function Home() {
	return (
		<>
			{/* TODO explanation for main */}
			{/* <Main /> */}

			{/* TODO respo */}
			<div className="w-screen h-screen flex items-center relative overflow-hidden pt-10 md:pt-0">
				<div className="bg-gradient-to-b from-black from-10% to-transparent w-screen h-10 absolute top-0 left-0" />
				<div className="bg-gradient-to-t from-black from-10% to-transparent w-screen h-10 absolute bottom-0 left-0" />

				<div className="h-full flex justify-center flex-col p-4 md:pl-10 md:w-1/2 text-gray-300">
					<p className="uppercase tracking-wide text-14 md:text-16 xl:text-20">
						Welcome to your new journey with
					</p>
					<h1 className="tracking-tight font-bold text-[48px] md:text-[72px] xl:text-[90px] xl:leading-[90px] mb-8">
						<span className="text-red-600">Bring</span>{" "}
						<span className="text-white">App</span>
					</h1>

					<p className="text-gray-200 mb-4">
						BringApp is a framework designed to help developers build NextJs
						applications using WordPress as a headless CMS and site builder. It
						provides a set of tools and components to help you get started
						quickly and build your app with ease.
					</p>

					{/* TODO link docs page */}
					<div className="flex xl:flex-row flex-col gap-4 md:mb-24 mb-8">
						<a className="text-white text-center md:text-18 bg-gradient-to-r from-60% from-red-600 to-red-900 bg-[length:200%_100%] hover:bg-right rounded-full py-2 px-8 transition-all duration-300 cursor-pointer">
							Get Started
						</a>

						<a
							target="_blank"
							rel="noopener noreferrer"
							href={`${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-admin/`}
							className="text-red-600 text-center md:text-18 outline outline-red-600 hover:text-white hover:outline-white -outline-offset-2 rounded-full py-2 px-8 transition-all duration-300"
						>
							Open WordPress admin
						</a>
					</div>

					{/* TODO naming and wp healthcheck + example post layout */}
					<Post />
				</div>

				<div className="purple-radial-gradient-lg absolute -z-10 h-[160vh] aspect-square md:right-[22%] -right-32" />
				<div className="bg-gray-950 absolute -z-10 h-[160vh] rounded-full aspect-square md:right-1/3 right-4" />
			</div>
		</>
	);
}
