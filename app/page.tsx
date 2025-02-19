import { Dancing_Script } from "next/font/google"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import EventList from "./components/EventList"

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
      <EventList events={events} />
    </div>
  )
}
