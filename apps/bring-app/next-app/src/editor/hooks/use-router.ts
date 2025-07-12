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
		back: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
		forward: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
		prefetch: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
		push: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
		refresh: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
		replace: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
	}
}
