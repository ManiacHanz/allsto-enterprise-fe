import { AppProps } from "next/app"
import Head from "next/head"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { theme } from "@/styles/themes"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import "../styles/globals.css"

const cache = createCache({
  key: "css",
  prepend: true,
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <CacheProvider value={cache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}
