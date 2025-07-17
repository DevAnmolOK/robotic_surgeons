"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

type SessionData = {
  status: string;
  customer: {
    name?: string;
    email?: string;
    id: string;
  };
  amount_total: number;
  currency: string;
};

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session_id) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session/${session_id}`);
        const data = await res.json();

        console.log(data);

        if (!data.success) throw new Error(data.message || 'Session fetch failed');

        setSessionData({
          status: data.status,
          customer: data.customer,
          amount_total: data.amount_total,
          currency: data.currency,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [session_id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 484px)' }}>
        <p className="text-lg">Loading payment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 484px)' }}>
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50 text-center" style={{ minHeight: 'calc(100vh - 484px)' }}>
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Thank you, {sessionData?.customer?.name ?? "customer"}.
      </p>
      <p className="text-base text-gray-600">
        A total of <strong>${sessionData?.amount_total}</strong>{" "}
        {sessionData?.currency.toUpperCase()} has been received.
      </p>

      {/* <p className="text-base text-gray-500 mt-4">
        A confirmation has been sent to <strong>{sessionData?.customer?.email}</strong>.
      </p> */}

    </div>
  );
}
