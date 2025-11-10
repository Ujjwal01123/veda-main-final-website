import { NextResponse } from "next/server"

export async function middleware(req) {
    const url = req.nextUrl
    const token = req.cookies.get("sessionToken")?.value
    const loginRoutes = ["/sign-in", "/sign-up"]

    if (loginRoutes.some((path) => url.pathname.startsWith(path))) {
        if (token) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }
    if (url.pathname.startsWith("/user/profile")) {
        if (!token) {
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }
    }

    if (url.pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/current-user`, {
                method: "POST",
                headers: {
                    Cookie: `sessionToken=${token}`,
                },
            })

            const { data } = await res.json()
            if (data.role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url))
            }
        } catch (err) {
            console.error("Middleware fetch error:", err)
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/user/profile/:path*", "/sign-in", "/sign-up"],
}
