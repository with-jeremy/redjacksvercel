'use client';

import React, { useState, useEffect } from "react";
import {
  useStripe, 
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

const CheckoutPage = ({ amount }: { amount: number}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
    }, [amount]);

    return (
      <form className="bg-white p-2 rounded-md">
        {clientSecret && <PaymentElement />}

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button>Buy Now</button>
      </form>
  };

export default CheckoutPage;
 