import type { BP as _BP, FCC as _FCC } from "@bring/blocks-client"

export type EP = {
	mainVideo: string | null
}

export type BP<P> = _BP<P, EP>
export type FCC<P> = _FCC<P, EP>
