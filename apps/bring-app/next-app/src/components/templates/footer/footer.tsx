import Section from "@/components/layout/section"

/**
 * Implement your custom footer here
 * Or delete this file and replace Footer in the RootLayout with the Bring Footer render component to build footer in WordPress
 */
const Footer = () => (
	<Section
		className="mt-auto py-4 text-center text-11 text-white opacity-90"
		containerClassName="flex justify-center"
		as="footer"
	>
		© {new Date().getFullYear()} Bring App
		<br />
		Made with ❤️ in Hungary
	</Section>
)

export default Footer
