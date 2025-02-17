"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "./AuthProvider"

const Navigation = () => {
  const pathname = usePathname()
  const { session, signOut } = useAuth()

  return (
    <nav className="bg-background">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold">
          Red Jacks
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/events" className={pathname === "/events" ? "text-blue-300" : "hover:text-gray-300"}>
              Events
            </Link>
          </li>
          {session ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={signOut} className="hover:text-gray-300">
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className={pathname === "/login" ? "text-blue-300" : "hover:text-gray-300"}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
