import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Account() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: events, error } = await supabase.from("events").select("*").order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return <div>Error loading events. Please try again later.</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id} className="block">
              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{event.show_title}</h3>
                <p>Door Time: {new Date(event.door_time).toLocaleString()}</p>
                <p>Start Time: {new Date(event.start_time).toLocaleString()}</p>
                <p>Capacity: {event.capacity}</p>
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
    </div>
  )
}
