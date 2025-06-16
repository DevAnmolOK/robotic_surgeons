'use client';

import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ minHeight: 'calc(100vh - 484px)' }}>
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-lg text-gray-700 mb-2">
        Your payment was not completed. If this was a mistake, you can try again.
      </p>
      <button
        onClick={() => router.push('/')}
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
}
