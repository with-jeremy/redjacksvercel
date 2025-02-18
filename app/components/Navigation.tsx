"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "./AuthProvider"
import { Dancing_Script } from "next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

const Navigation = () => {
  const pathname = usePathname()
  const { session, signOut } = useAuth()

  return (
    <nav className="bg-background border-b border-blood">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/events" className="text-xl text-blood">
          Events
        </Link>
        <Link href="/" className={`text-6xl font-bold text-blood ${dancingScript.className}`}>
          Red Jacks
        </Link>
        <Link href="/account" className="text-xl text-blood">
          My Tickets
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
