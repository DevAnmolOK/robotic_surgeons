'use client';

import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ minHeight: 'calc(100vh - 484px)' }}>
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="mb-3 text-pbase leading-relaxed">
        Your payment was not completed. If this was a mistake, you can try again.
      </p>
      <button
        onClick={() => router.push('/')}
        className="bg-black w-fit text-pxl text-white px-3 sm:px-6 xl:px-8 sm:py-2 py-1 rounded-full  font-[400]  hover:shadow-lg transition cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
}
