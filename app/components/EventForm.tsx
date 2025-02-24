"use client";

import type React from "react";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function EventForm() {
  const [showTitle, setShowTitle] = useState("")
  const [doorTime, setDoorTime] = useState("")
  const [startTime, setStartTime] = useState("")
  const [capacity, setCapacity] = useState("")
  const [showFlyer, setShowFlyer] = useState<File | null>(null)
  const [price, setPrice] = useState("")
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
        const fileExt = showFlyer.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`; // Use UUID for filename
        const filePath = `public/${fileName}`; // Store in 'public' folder for global access

        const { error: uploadError } = await supabase.storage
          .from("showPosters")
          .upload(filePath, showFlyer, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("File upload error:", uploadError);
          throw new Error(`Could not upload image: ${uploadError.message}. Please check your storage bucket policies.`);
        }

        const { data, error: getUrlError } = supabase.storage
          .from("showPosters")
          .getPublicUrl(filePath);

        if (getUrlError) {
          console.error("Error getting public URL:", getUrlError);
          throw getUrlError; // Or handle appropriately
        }

        showFlyerUrl = data.publicUrl;
      }

      const { data: user, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError);
        setError("Error fetching user. Please try again.");
        setIsLoading(false);
        return;
      }

      if (!user) {
        console.error("User not authenticated");
        setError("User not authenticated. Please log in.");
        setIsLoading(false);
        return;
      }

      console.log("Authenticated user:", user); // Add logging

      const { error: insertError } = await supabase.from("events").insert({
        show_title: showTitle,
        door_time: doorTime,
        start_time: startTime,
        capacity: Number.parseInt(capacity),
        show_flyer_url: showFlyerUrl,
        price: Number.parseFloat(price),
        user_id: user.id,
      }, {
        returning: "minimal" // Ensure the policy allows the insertion
      });

      if (insertError) {
        console.error("Database insert error:", insertError);
        throw new Error(`Could not create event: ${insertError.message}`);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      console.error("Error creating event:", err);
      setError(`Error creating event: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="showTitle" className="block mb-2 text-white">
          Show Title
        </label>
        <input
          id="showTitle"
          type="text"
          value={showTitle}
          onChange={(e) => setShowTitle(e.target.value)}
          required
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div>
        <label htmlFor="doorTime" className="block mb-2 text-white">
          Door Time
        </label>
        <input
          id="doorTime"
          type="datetime-local"
          value={doorTime}
          onChange={(e) => setDoorTime(e.target.value)}
          required
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div>
        <label htmlFor="startTime" className="block mb-2 text-white">
          Start Time
        </label>
        <input
          id="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="w-full p-2 border rounded text-black"
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="capacity" className="block mb-2 text-white">
            Capacity
          </label>
          <input
            id="capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="price" className="block mb-2 text-white">
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded text-black"
          />
        </div>
      </div>
      <div>
        <label htmlFor="showFlyer" className="block mb-2 text-white">
          Show Flyer
        </label>
        <input
          id="showFlyer"
          type="file"
          accept="image/*"
          onChange={(e) => setShowFlyer(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded text-black"
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
  );
}