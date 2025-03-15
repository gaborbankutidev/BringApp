import Column from "@/components/layout/column"
import Row from "@/components/layout/row"
import Section from "@/components/layout/section"
import Markdown from "@/components/markdown"
import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getWpStatus, type WpStatus } from "./get-wp-status"
import Posts from "./posts"

export const dynamic = "force-dynamic"

const wpAdminUrl = `${env.NEXT_PUBLIC_WP_BASE_URL}/wp-admin/`

const Home = async () => {
	const wpStatus = await getWpStatus()
	const errorNotice = wpHealthCheckNotices.find(({ status }) => status === wpStatus)

	return (
		<Section dark>
			<Row size="split">
				<Column>
					<p className="text-14 uppercase tracking-wide text-white md:text-16 xl:text-20">
						Welcome to your journey with
					</p>
					<h1 className="-ml-1 mb-8 text-[48px] font-bold tracking-tight sm:text-[56px] lg:text-[72px] xl:text-[90px]">
						<span className="text-purple-600">Bring</span> <span className="text-white">App</span>
					</h1>
					<p className="mb-6">
						BringApp is a framework designed to help developers build NextJs applications using
						WordPress as a headless CMS and site builder. It provides a set of tools and components
						to help you get started quickly and build your app with ease.
					</p>
					<div className="mb-8 flex flex-col gap-4 md:mb-24 xl:flex-row">
						<Link
							href="/docs"
							className="cursor-pointer rounded-full bg-purple-600 from-60% px-8 py-2 text-center text-white transition-all duration-300 hover:bg-purple-800 md:text-18"
						>
							Get Started
						</Link>

						<Link
							target="_blank"
							rel="noopener noreferrer"
							href={errorNotice?.href ? errorNotice.href : wpAdminUrl}
							className={cn(
								"rounded-full px-8 py-2 text-center text-white outline -outline-offset-2 outline-purple-600 transition-all duration-300 hover:text-white hover:outline-white md:text-18",
								(wpStatus === "error" || wpStatus === "unavailable") &&
									"pointer-events-none opacity-40"
							)}
						>
							{wpStatus === "ok"
								? "Open WordPress admin"
								: errorNotice
									? errorNotice.cta
									: "Unkown error"}
						</Link>
					</div>

					{errorNotice && (
						<div className="flex min-h-[180px] items-center rounded-lg border border-red-600 bg-gray-800/80 px-4 py-8">
							<div>
								<h3 className="text-24s mb-4 text-red-600">{errorNotice.title}</h3>
								<Markdown className="text-red-600">{errorNotice.notice}</Markdown>
							</div>
						</div>
					)}
				</Column>
				<Column className="overflow-hidden">
					<Posts />
				</Column>
			</Row>
		</Section>
	)
}

export default Home

type WpHealthCheckNotice = {
	status: WpStatus
	cta: string
	href?: string
	title: string
	notice: string
}

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
		status: "plugin-not-activated",
		cta: "Activate WordPress plugin",
		href: `${wpAdminUrl}plugins.php`,
		title: "WordPress plugin not activated",
		notice: `Make sure to visit \`${wpAdminUrl}plugins.php\` and activate your Bring App plugin.`,
	},
	{
		status: "not-set-up",
		cta: "Set up WordPress",
		title: "WordPress not set up",
		notice: `Make sure to visit \`${wpAdminUrl}\` and set up your WordPress installation.`,
	},
]
