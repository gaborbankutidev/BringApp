import Column from "@/components/layout/column"
import Row from "@/components/layout/row"
import Section from "@/components/layout/section"
import Markdown from "@/components/markdown"
import fs from "fs"
import path from "path"

const Readme = () => {
	const filePath = path.join(process.cwd(), "..", "readme.md")
	const readmeContent = fs.readFileSync(filePath, "utf8")

	return (
		<Section className="dark">
			<Row size="split">
				<Column>
					<p className="text-14 uppercase tracking-wide md:text-16 xl:text-20">
						Hit the ground running with
					</p>

					<div className="mb-8 flex flex-col items-baseline 2xl:flex-row 2xl:gap-4">
						<h1 className="-ml-1 text-[48px] font-bold tracking-tight xl:text-[56px]">
							<span className="text-purple-600">Bring</span> <span className="text-white">App</span>{" "}
							<span className="font-normal text-white">Docs</span>{" "}
						</h1>
						<h3>
							<span className="text-white">/</span>{" "}
							<span className="font-normal text-white">Project setup</span>{" "}
						</h3>
					</div>

					<div className="w-full rounded-lg bg-gray-800/60 px-4 py-8">
						<Markdown className="flex flex-col gap-4 leading-7">{readmeContent}</Markdown>
					</div>
				</Column>
			</Row>
		</Section>
	)
}

export default Readme
