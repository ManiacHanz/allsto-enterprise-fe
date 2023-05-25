import Link from "next/link"
import { useRouter } from "next/router"
import { FC, ReactNode } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, Button } from "@mui/material"
import { Session } from "next-auth"

type Props = {
  children: ReactNode
  addonAfter?: ReactNode | string
}

const routes = [
  {
    path: "mine",
    label: "My EnterPrise",
  },
  {
    path: "links",
    label: "Payment Links",
  },
  {
    path: "clients",
    label: "Clients",
  },
  {
    path: "payments",
    label: "Payments",
  },
]

export const Layout: FC<Props> = ({ children, addonAfter }) => {
  const { data: session, ...rest } = useSession()

  const {
    query: { id },
    pathname,
  } = useRouter()

  const getPathname = () => {
    const path = pathname.split("/").pop()
    return routes.find((route) => route.path === path)?.label ?? ""
  }

  console.log("session:", session, rest)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="h-16 bg-gray-800 flex items-center px-4 justify-between">
        <div className="space-x-8 text-white">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={`/dashboard/${id}/${route.path}`}
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div>
          {session ? (
            <div className="flex">
              <Avatar alt="github avatar" src={session.user?.image ?? ""} />
              <Button onClick={() => signOut()}>Sign out</Button>
            </div>
          ) : (
            <Button onClick={() => signIn()}>Sign in</Button>
          )}
        </div>
      </div>
      <div className="shadow-md h-16 px-4 leading-16 flex justify-between text-2xl font-bold items-center">
        <div>{getPathname()}</div>
        {addonAfter}
      </div>
      {children}
    </div>
  )
}
