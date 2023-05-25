import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAuthenticated } from "./utils/auth"

export function middleware(request: NextRequest) {
  // const allCookies = request.cookies.getAll()
  // let loginToken = request.cookies.get("next-auth.session-token")?.value
  // if (request.nextUrl.pathname.startsWith("/pay")) {
  //   if (!isAuthenticated(request)) {
  //     return new NextResponse(
  //       JSON.stringify({ success: false, message: "authentication failed" }),
  //       { status: 401, headers: { "content-type": "application/json" } }
  //     )
  //   }
  // }
}
