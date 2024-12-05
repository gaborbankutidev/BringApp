import Link from "next/link"

export default function Docs() {
	return (
		<>
			<p className="text-14 uppercase tracking-wide md:text-16 xl:text-20">
				Hit the ground running with
			</p>
			<h1 className="-ml-1 mb-8 text-[48px] font-bold tracking-tight xl:text-[56px]">
				<span className="text-purple-600">Bring</span> <span className="text-white">App</span>{" "}
				<span className="font-normal text-white">Docs</span>
			</h1>

			<div className="flex w-full flex-col gap-4 lg:flex-row">
				<Link
					href="/docs/readme"
					className="cursor-pointer rounded-lg border border-gray-500/60 bg-gray-800/60 px-4 py-8 transition-all duration-300 hover:bg-gray-700/60 lg:w-1/2"
				>
					<p className="mb-2 text-14 text-purple-600">How to initialize your project</p>
					<h3 className="text-24s mb-4">Project setup</h3>

					<p>
						Follow the steps to create a new project using BringApp and start building your app.
					</p>
				</Link>

				<Link
					href="https://bring-app-docs.vercel.app/"
					target="_blank"
					rel="noopener noreferrer"
					className="cursor-pointer rounded-lg border border-gray-500/60 bg-gray-800/60 px-4 py-8 transition-all duration-300 hover:bg-gray-700/60 lg:w-1/2"
				>
					<p className="mb-2 text-14 text-purple-600">Get to know your tools</p>
					<h3 className="text-24s mb-4">API documentation</h3>

					<p>Dive deeper into the usage of the dependency packages maintained for the Bring App.</p>
				</Link>
			</div>
		</>
	)
}
