import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export default async function EventDetail({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const { data: event, error } = await supabase.from("events").select("*").eq("id", params.id).single()

  if (error || !event) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{event.show_title}</h1>
      <div className="mb-4">
        <p>
          <strong>Door Time:</strong> {new Date(event.door_time).toLocaleString()}
        </p>
        <p>
          <strong>Start Time:</strong> {new Date(event.start_time).toLocaleString()}
        </p>
        <p>
          <strong>Capacity:</strong> {event.capacity}
        </p>
      </div>
      {event.show_flyer_url && (
        <img src={event.show_flyer_url || "/placeholder.svg"} alt="Show Flyer" className="w-full max-w-md mx-auto" />
      )}
    </div>
  )
}
