import { NextRequest } from "next/server"

export const isAuthenticated = (request: NextRequest) => {
  return !!request.cookies.get("next-auth.session-token")
}
