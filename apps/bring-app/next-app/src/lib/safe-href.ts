/**
 * Mirrors `sanitizeUrl` from @bring/blocks-client (added in DP-2017) — replace this
 * local copy with that import once it is available in the installed version.
 *
 * CMS-sourced URLs (menu items, site options, block attributes) are editor-controlled
 * and must never reach an href with a scriptable scheme such as `javascript:`.
 * Relative URLs and http/https/mailto/tel pass through; anything else becomes the fallback.
 */
export const safeHref = (url: string | null | undefined, fallback = "#"): string => {
	if (!url) {
		return fallback
	}

	const trimmed = url.trim()
	// browsers strip control chars/whitespace when parsing schemes ("java\tscript:")
	const detectable = trimmed.replace(/[\u0000- ]/g, "")
	const hasScheme = /^[a-z][a-z\d+\-.]*:/i.test(detectable)

	return !hasScheme || /^(https?|mailto|tel):/i.test(detectable) ? trimmed : fallback
}
