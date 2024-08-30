import Markdown from "@/components/markdown";
import {env} from "@/env.mjs";
import Link from "next/link";
import {twJoin} from "tailwind-merge";
import {getWpStatus, type WpStatus} from "./get-wp-status";
import Posts from "./posts";

const wpAdminUrl = `${env.NEXT_PUBLIC_WP_BASE_URL}/wp-admin/`;

const Home = async () => {
	const wpStatus = await getWpStatus();
	const errorNotice = wpHealthCheckNotices.find(
		({status}) => status === wpStatus,
	);

	return (
		<>
			<p className="uppercase tracking-wide text-14 md:text-16 xl:text-20">
				Welcome to your journey with
			</p>
			<h1 className="tracking-tight font-bold text-[48px] sm:text-[56px] lg:text-[72px] xl:text-[90px] mb-8 -ml-1">
				<span className="text-purple-600">Bring</span>{" "}
				<span className="text-white">App</span>
			</h1>

			<p className="text-gray-200 mb-6">
				BringApp is a framework designed to help developers build NextJs
				applications using WordPress as a headless CMS and site builder. It
				provides a set of tools and components to help you get started quickly
				and build your app with ease.
			</p>

			<div className="flex xl:flex-row flex-col gap-4 md:mb-24 mb-8">
				<Link
					href="/docs"
					className="text-white text-center md:text-18 from-60% bg-purple-600 hover:bg-purple-800 rounded-full py-2 px-8 transition-all duration-300 cursor-pointer"
				>
					Get Started
				</Link>

				<a
					target="_blank"
					rel="noopener noreferrer"
					href={errorNotice?.href ? errorNotice.href : wpAdminUrl}
					className={twJoin(
						"text-white text-center md:text-18 outline outline-purple-600 hover:text-white hover:outline-white -outline-offset-2 rounded-full py-2 px-8 transition-all duration-300",
						(wpStatus === "error" || wpStatus === "unavailable") &&
							"pointer-events-none opacity-40",
					)}
				>
					{wpStatus === "ok"
						? "Open WordPress admin"
						: errorNotice
							? errorNotice.cta
							: "Unkown error"}
				</a>
			</div>

			{errorNotice && (
				<div className="bg-gray-800/60 min-h-[180px] flex items-center border border-gray-500/60 px-4 py-8 rounded-lg border-red-600">
					<div>
						<h3 className="text-24s mb-4 text-red-600">{errorNotice.title}</h3>
						<Markdown className="text-red-600">{errorNotice.notice}</Markdown>
					</div>
				</div>
			)}

			<Posts />
		</>
	);
};

export default Home;

type WpHealthCheckNotice = {
	status: WpStatus;
	cta: string;
	href?: string;
	title: string;
	notice: string;
};

const wpHealthCheckNotices: WpHealthCheckNotice[] = [
	{
		status: "error",
		cta: "WordPress error",
		title: "Unknown WordPress error",
		notice: `Visit \`${wpAdminUrl}\` and check the status of your WordPress installation.`,
	},
	{
		status: "unavailable",
		cta: "WordPress is offline",
		title: "WordPress is unreachable",
		notice: `Make sure the backend services are running and Wordpress is reachable at \`${env.NEXT_PUBLIC_WP_BASE_URL}\`.`,
	},
	{
		status: "theme-not-activated",
		cta: "Activate WordPress theme",
		href: `${wpAdminUrl}themes.php`,
		title: "WordPress theme not activated",
		notice: `Make sure to visit \`${wpAdminUrl}themes.php\` and activate your project theme.`,
	},
	{
		status: "not-set-up",
		cta: "Set up WordPress",
		title: "WordPress not set up",
		notice: `Make sure to visit \`${wpAdminUrl}\` and set up your WordPress installation.`,
	},
];
