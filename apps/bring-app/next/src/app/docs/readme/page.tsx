import fs from "fs";
import path from "path";
import Markdown from "react-markdown";

const Readme = async () => {
	const filePath = path.join(process.cwd(), "..", "readme.md");
	const readmeContent = fs.readFileSync(filePath, "utf8");

	return (
		<div>
			<p className="uppercase tracking-wide text-14 md:text-16 xl:text-20">
				Hit the ground running with
			</p>

			<div className="flex flex-col 2xl:flex-row items-baseline 2xl:gap-4 mb-8">
				<h1 className="tracking-tight font-bold text-[48px] xl:text-[56px] -ml-1">
					<span className="text-purple-600">Bring</span>{" "}
					<span className="text-white">App</span>{" "}
					<span className="text-white font-normal">Docs</span>{" "}
				</h1>
				<h3>
					<span className="text-white">/</span>{" "}
					<span className="text-white font-normal">Project setup</span>{" "}
				</h3>
			</div>

			<div className="w-full bg-gray-800/60 px-4 py-8 rounded-lg">
				<Markdown className="flex flex-col gap-4 leading-7">
					{readmeContent}
				</Markdown>
			</div>
		</div>
	);
};

export default Readme;
