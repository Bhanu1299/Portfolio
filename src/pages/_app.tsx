import type { AppProps } from 'next/app'
import { Session } from 'next-auth'
import Head from 'next/head'
import '../styles/globals.css'
import { ThemeProvider } from '../components/theme-provider'
import { AuthProvider } from '../components/providers/session-provider'

type AppPropsWithAuth = AppProps & {
  pageProps: {
    session?: Session
  }
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuth) {
  return (
    <>
      <Head>
        <title>Portfolio | Full-Stack Developer</title>
        <meta name="description" content="Modern portfolio showcasing full-stack development skills with Next.js, React, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="portfolio, full-stack, developer, next.js, react, typescript" />
        <meta name="author" content="Your Name" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Portfolio | Full-Stack Developer" />
        <meta property="og:description" content="Modern portfolio showcasing full-stack development skills" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio | Full-Stack Developer" />
        <meta name="twitter:description" content="Modern portfolio showcasing full-stack development skills" />
        
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider session={session}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}