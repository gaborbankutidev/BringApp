"use server"

import { Main } from "@/bring/render"

export async function action() {
	return <Main slug="test-post" />
}
