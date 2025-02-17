import Link from "next/link"
import { Dancing_Script } from "next/font/google"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className={`text-center bg-background text-foreground min-h-screen flex flex-col items-center justify-center ${dancingScript.className}`}>
      <h1 className="text-6xl font-bold mb-8 text-silver">Welcome to Red Jacks</h1>
      <p className="text-2xl mb-8 text-silver">Discover and book tickets for amazing events!</p>
      <Link href="/events" className="bg-pirate hover:bg-blood text-silver font-bold py-2 px-4 rounded">
        View Events
      </Link>
    </div>
  )
}
