import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import TicketPurchase from "./TicketPurchase";

export default async function EventDetail({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: event, error } = await supabase.from("events").select("*").eq("id", params.id).single();

  if (error || !event) {
    notFound();
  }

  return <TicketPurchase event={event} />;
}
