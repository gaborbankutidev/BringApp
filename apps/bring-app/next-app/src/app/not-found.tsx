import Button from "@/components/button"
import Section from "@/components/layout/section"
import Link from "next/link"

const NotFound = () => {
	return (
		<Section className="py-24" containerClassName="flex flex-col items-center justify-center">
			<h1 className="mb-3">Page Not Found</h1>
			<p className="mb-5">The page you are looking for does not exist.</p>
			<div className="flex gap-3">
				<Button asChild>
					<Link href="/">Main page</Link>
				</Button>
			</div>
		</Section>
	)
}

export default NotFound
