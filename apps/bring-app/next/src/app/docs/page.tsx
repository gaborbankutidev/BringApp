export default function Docs() {
	return (
		<>
			<p className="uppercase tracking-wide text-14 md:text-16 xl:text-20">
				Hit the ground running with
			</p>
			<h1 className="tracking-tight font-bold text-[48px] xl:text-[56px] mb-8 -ml-1">
				<span className="text-purple-600">Bring</span>{" "}
				<span className="text-white">App</span>{" "}
				<span className="text-white font-normal">Docs</span>
			</h1>

			<div className="flex gap-4 flex-col w-full lg:flex-row">
				<a
					href="/docs/readme"
					className="bg-gray-800/60 border border-gray-500/60 px-4 py-8 rounded-lg lg:w-1/2 hover:bg-gray-700/60 cursor-pointer transition-all duration-300"
				>
					<p className="text-14 text-purple-600 mb-2">
						How to initialize your project
					</p>
					<h3 className="text-24s mb-4">Project setup</h3>

					<p>
						Follow the steps to create a new project using BringApp and start
						building your app.
					</p>
				</a>

				<a
					href="https://bring-app-docs.vercel.app/"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-all duration-300 bg-gray-800/60 border border-gray-500/60 px-4 py-8 rounded-lg lg:w-1/2 hover:bg-gray-700/60 cursor-pointer"
				>
					<p className="text-14 text-purple-600 mb-2">Get to know your tools</p>
					<h3 className="text-24s mb-4">API documentation</h3>

					<p>
						Dive deeper into the usage of the dependency packages maintained for
						the Bring App.
					</p>
				</a>
			</div>
		</>
	);
}
