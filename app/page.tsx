import Link from "next/link"
import { Dancing_Script } from "next/font/google"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const dancingScript = Dancing_Script({ subsets: ["latin"] })

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const { data: events, error } = await supabase.from("events").select("*").order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return <div>Error loading events. Please try again later.</div>
  }

  return (
    <div className={`text-center bg-background text-foreground flex flex-col items-center justify-center`}>
      <h1 className={`text-6xl font-bold mb-8 text-blood ${dancingScript.className}`}>Welcome to Red Jacks</h1>
      <p className="text-2xl mb-8 text-silver">Discover and book tickets for amazing events!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id} className="block">
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow text-center">
              <h2 className="text-xl font-semibold mb-2">{event.show_title}</h2>
              <div className="mb-4">
                <p>
                  <strong>{new Date(event.start_time).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit" })} @ {new Date(event.door_time).toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}</strong>
                </p>
              </div>
              {event.show_flyer_url && (
                  <img
                    src={event.show_flyer_url || "/placeholder.svg"}
                    alt="Show Flyer"
                    className="mt-2 max-w-full h-auto"
                  />
                )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
