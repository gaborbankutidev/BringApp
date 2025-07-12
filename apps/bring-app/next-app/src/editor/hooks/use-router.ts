/**
 * Mock implementation of Next.js useRouter hook for the editor environment.
 * This is aliased via webpack to replace next/navigation in the editor.
 */

type MockRouter = {
	back: () => void
	forward: () => void
	prefetch: (href: string, options?: { kind?: "auto" | "full" }) => void
	push: (href: string, options?: { scroll?: boolean }) => void
	refresh: () => void
	replace: (href: string, options?: { scroll?: boolean }) => void
}

export const useRouter = (): MockRouter => {
	return {
		back: () => {},
		forward: () => {},
		prefetch: () => {},
		push: () => {},
		refresh: () => {},
		replace: () => {},
	}
}
