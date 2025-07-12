'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export interface ForgotPasswordRequest {
  email: string;
}

// export interface ResetPasswordRequest {
//   token: string;
//   email: string;
//   password: string;
//   password_confirmation: string;
// }

export interface ApiResponse {
  message?: string;
  error?: string;
}

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email } as ForgotPasswordRequest),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset link');
      }

      setMessage(data.message || 'Reset link sent successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="flex flex-row min-h-screen justify-center items-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-t2 mb-3 leading-tight font-playfair text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="text-pbase leading-relaxed mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 rounded-full w-full border border-[#DBDBDB] px-5 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-theme hover:bg-htheme hover:cursor-pointer"} text-white py-3 lg:py-3 rounded-full font-normal font-sans  tracking-tight transition text-pxl`}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>

        </form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Back to Login
          </Link>
        </div>

        {message && (
          <div className="mt-4 p-3 text-green-700 rounded-full">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 text-red-700 rounded-full">
            {error}
          </div>
        )}


      </div>
    </div>
  );
}