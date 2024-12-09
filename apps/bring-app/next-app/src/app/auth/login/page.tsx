import { cookies } from "next/headers"

export default async function Home() {
	const bringAuthCookie = (await cookies()).get("bring-auth-token")
	return (
		<div className="max-w-lg p-4">
			<form method="post" action="/api/auth/login">
				<h1 className="h2 text-orange mb-8 text-center">Sign in</h1>

				<div className="mx-auto flex max-w-[360px] flex-col justify-end gap-4">
					<label htmlFor="username">Username</label>
					<input type="text" name="username" id="username" className="w-full" />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" className="w-full" />

					<button type="submit">Log in</button>
				</div>
			</form>
			{bringAuthCookie && (
				<div>
					Current cookie: {bringAuthCookie.value}
					<form method="post" action="/api/auth/logout">
						<button type="submit">Log out</button>
					</form>
				</div>
			)}
		</div>
	)
}
