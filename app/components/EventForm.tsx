"use client"

import type React from "react"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function EventForm() {
  const [showTitle, setShowTitle] = useState("")
  const [doorTime, setDoorTime] = useState("")
  const [startTime, setStartTime] = useState("")
  const [capacity, setCapacity] = useState("")
  const [showFlyer, setShowFlyer] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      let showFlyerUrl = ""

      if (showFlyer) {
        const fileExt = showFlyer.name.split(".").pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from("show-flyers").upload(fileName, showFlyer)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage.from("show-flyers").getPublicUrl(fileName)

        showFlyerUrl = publicUrl
      }

      const { error: insertError } = await supabase.from("events").insert({
        show_title: showTitle,
        door_time: doorTime,
        start_time: startTime,
        capacity: Number.parseInt(capacity),
        show_flyer_url: showFlyerUrl,
      })

      if (insertError) throw insertError

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Error creating event:", error)
      setError("Error creating event. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="showTitle" className="block mb-2">
          Show Title
        </label>
        <input
          id="showTitle"
          type="text"
          value={showTitle}
          onChange={(e) => setShowTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="doorTime" className="block mb-2">
          Door Time
        </label>
        <input
          id="doorTime"
          type="datetime-local"
          value={doorTime}
          onChange={(e) => setDoorTime(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="startTime" className="block mb-2">
          Start Time
        </label>
        <input
          id="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="capacity" className="block mb-2">
          Capacity
        </label>
        <input
          id="capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="showFlyer" className="block mb-2">
          Show Flyer
        </label>
        <input
          id="showFlyer"
          type="file"
          accept="image/*"
          onChange={(e) => setShowFlyer(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
      >
        {isLoading ? "Creating..." : "Create Event"}
      </button>
    </form>
  )
}
