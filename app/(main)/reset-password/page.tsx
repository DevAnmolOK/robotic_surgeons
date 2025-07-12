'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ApiResponse {
  message?: string;
  error?: string;
}

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Get token and email from URL parameters
    const tokenParam = searchParams.get('token');
    const emailParam = searchParams.get('email');

    if (tokenParam) {
      setToken(tokenParam);
    }

    if (emailParam) {
      // Decode the email in case it contains special characters
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError('Invalid reset token');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const payload: ResetPasswordRequest = {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setMessage(data.message || 'Password reset successfully');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="flex flex-row min-h-screen justify-center items-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
      <div className="max-w-md  mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-t2 mb-3 leading-tight font-playfair text-center">Reset Password</h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg w-full max-w-sm">
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

          <div className="mb-4">
            <label htmlFor="password" className="text-pbase leading-relaxed mb-2">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-1 rounded-full w-full border border-[#DBDBDB] px-5 py-3"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="passwordConfirmation" className="text-pbase leading-relaxed mb-2">
              Confirm Password
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              minLength={8}
              className="mt-1 rounded-full w-full border border-[#DBDBDB] px-5 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !token}
            className={`w-full ${isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-theme hover:bg-htheme hover:cursor-pointer"} text-white py-3 lg:py-3 rounded-full font-normal font-sans  tracking-tight transition text-pxl`}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Back to Login
          </Link>
        </div>

        {message && (
          <div className="mt-4 p-3 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 text-red-700">
            {error}
          </div>
        )}


      </div>
    </div>
  );
}