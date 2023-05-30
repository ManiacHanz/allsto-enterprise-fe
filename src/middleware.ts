import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

const { NODE_ENV } = process.env

const getApiAccessRoles = (pathname: string) => {
  if (pathname.startsWith("/api/v1/swap/pending")) {
    return ["root"]
  } else if (pathname.startsWith("/api/v1/admin/restart")) {
    return ["root", "admin", "operator"]
  } else if (
    pathname.startsWith("/api/v1/admin") ||
    pathname.startsWith("/api/v1/stats")
  ) {
    return ["root", "admin"]
  }
}

const getPageAccessRoles = (pathname: string) => {
  if (pathname.startsWith("/pending")) {
    return ["root"]
  } else if (
    pathname.startsWith("/relayer") ||
    pathname.startsWith("/premium") ||
    pathname.startsWith("/stats") ||
    pathname.startsWith("/rules") ||
    pathname.startsWith("/banners")
  ) {
    return ["root", "admin"]
  } else if (pathname.startsWith("/lp")) {
    return ["root", "admin", "operator"]
  }
}

export const middleware = withAuth(
  async function middleware(req) {
    console.log("middleware")
    // if (NODE_ENV !== "production") {
    //   return
    // }
    // if (req.headers.get("x-forwarded-proto") !== "https") {
    //   return NextResponse.redirect(
    //     `https://${req.headers.get("host")}${req.nextUrl.pathname}`
    //   )
    // }
    // const token = req.nextauth.token
    // const roles = token?.roles || []
    // const pathname = req.nextUrl.pathname
    // if (pathname.startsWith("/api/v1")) {
    //   const apiRoles = getApiAccessRoles(pathname)
    //   if (apiRoles && !apiRoles.some((r) => roles.includes(r))) {
    //     return NextResponse.rewrite(new URL("/api/401", req.url))
    //   }
    // } else {
    //   const pageRoles = getPageAccessRoles(pathname)
    //   if (pageRoles) {
    //     if (!token) {
    //       return NextResponse.redirect(new URL("/", req.url))
    //     } else if (!pageRoles.some((r) => roles.includes(r))) {
    //       return NextResponse.rewrite(new URL("/unauthorized", req.url))
    //     }
    //   }
    // }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/api/v1")) {
          return !!token
        }
        return true
      },
    },
    pages: {
      signIn: "/",
    },
  }
)

export const config = {
  matcher: "/dashboard/:path*",
}
