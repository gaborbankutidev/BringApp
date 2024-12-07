/**
 * Implement your custom footer here
 * Or delete this file and replace Footer in the RootLayout with the Bring Footer render component to build footer in WordPress
 */
const Footer = () => (
	<footer className="mt-auto flex justify-center py-4 text-center text-11 text-white opacity-90">
		© {new Date().getFullYear()} Bring App
		<br />
		Made with ❤️ in Hungary
	</footer>
)

export default Footer
