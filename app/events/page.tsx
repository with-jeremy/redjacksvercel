import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Events() {
  const supabase = createServerComponentClient({ cookies })

  const { data: events, error } = await supabase.from("events").select("*").order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return <div>Error loading events. Please try again later.</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id} className="block">
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{event.show_title}</h2>
              <p>Start Time: {new Date(event.start_time).toLocaleString()}</p>
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
