/**
 * Implement your custom footer here
 * Or delete this file and replace Footer in the RootLayout with the Bring Footer render component to build footer in WordPress
 */
const Footer = () => (
	<footer className="text-white flex justify-center text-center text-11 mt-auto py-4 opacity-90">
		© {new Date().getFullYear()} Bring App
		<br />
		Made with ❤️ in Hungary
	</footer>
);

export default Footer;
