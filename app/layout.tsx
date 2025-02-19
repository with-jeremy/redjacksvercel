import type React from "react"
import Link from "next/link"
import "./globals.css"
import { Inter, Dancing_Script } from "next/font/google"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Navigation from "./components/Navigation"
import { AuthProvider } from "./components/AuthProvider"

const inter = Inter({ subsets: ["latin"] })
const dancingScript = Dancing_Script({ subsets: ["latin"] })

export const metadata = {
  title: "Red Jacks Entertainment",
  description: "Manage events and sell tickets for your venue"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <AuthProvider initialSession={session}>
          <Navigation />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer>
            <div className="container mx-auto text-center px-4 py-8">
            Website by Jeremy@WithJeremy.com - Copyright 2025 <Link href="/dashboard">@</Link> Red Jacks Entertainment
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}