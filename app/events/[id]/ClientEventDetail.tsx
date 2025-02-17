"use client";

import { useState } from "react";

export default function ClientEventDetail({ event }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">{event.show_title}</h1>
      <div className="mb-4 text-center">
        <p>
          <strong>{new Date(event.start_time).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })} at {new Date(event.door_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })} </strong>
        </p>     
      </div>
      <div className="mb-4 text-center">
      <input type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} min={1} max={6} className="rounded px-2 py-1 text-center bg-white text-black appearance-none" style={{ MozAppearance: 'textfield', WebkitAppearance: 'number-input' }} /> X $10 <br /> 
      </div>
      <div className="mb-4 text-center">
        <button className="border rounded px-4 py-2 bg-white text-black border-blood">
        Buy Now
        </button>
      </div>
      <img src="/images/event.jpg" alt="Show Flyer" className="w-full max-w-md mx-auto" />
      <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
