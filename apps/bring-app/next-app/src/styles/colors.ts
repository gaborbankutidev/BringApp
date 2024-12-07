export const colors = {
	// Brand colors
	"purple-400": "hsl(var(--purple-400))",
	"purple-600": "hsl(var(--purple-600))",
	"purple-800": "hsl(var(--purple-800))",

	// Gray colors
	"gray-50": "hsl(var(--gray-50))",
	"gray-100": "hsl(var(--gray-100))",
	"gray-200": "hsl(var(--gray-200))",
	"gray-300": "hsl(var(--gray-300))",
	"gray-400": "hsl(var(--gray-400))",
	"gray-500": "hsl(var(--gray-500))",
	"gray-600": "hsl(var(--gray-600))",
	"gray-700": "hsl(var(--gray-700))",
	"gray-800": "hsl(var(--gray-800))",
	"gray-900": "hsl(var(--gray-900))",

	// Basic colors
	white: "hsl(var(--white))",
	black: "hsl(var(--black))",
	transparent: "hsl(var(--transparent))",

	// Other colors
	"red-500": "hsl(var(--red-500))",
	"red-600": "hsl(var(--red-600))",
	"red-900": "hsl(var(--red-900))",

	// Theme colors
	background: "hsl(var(--background))",
	foreground: "hsl(var(--foreground))",
	muted: "hsl(var(--muted))",
	"muted-foreground": "hsl(var(--muted-foreground))",
	card: "hsl(var(--card))",
	"card-foreground": "hsl(var(--card-foreground))",
	popover: "hsl(var(--popover))",
	"popover-foreground": "hsl(var(--popover-foreground))",
	border: "hsl(var(--border))",
	input: "hsl(var(--input))",
	primary: "hsl(var(--primary))",
	"primary-foreground": "hsl(var(--primary-foreground))",
	secondary: "hsl(var(--secondary))",
	"secondary-foreground": "hsl(var(--secondary-foreground))",
	accent: "hsl(var(--accent))",
	"accent-foreground": "hsl(var(--accent-foreground))",
	destructive: "hsl(var(--destructive))",
	"destructive-foreground": "hsl(var(--destructive-foreground))",
	ring: "hsl(var(--ring))",
} as const

export const colorList = Object.keys(colors)

export type ColorType = keyof typeof colors
