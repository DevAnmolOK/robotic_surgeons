"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const doctorId = localStorage.getItem("doctor_id");
    const doctorEmail = localStorage.getItem("doctor_email");

    if (doctorId && doctorEmail) {
      // Already logged in, redirect to membership or home
      router.push("/membership"); // or "/"
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    

    try {

     await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("doctor_id", data.doctor?.doctor_id || "");
      localStorage.setItem("doctor_name", data.doctor?.doctor_name || "");
      localStorage.setItem("doctor_email", data.user?.email || "");
      router.push("/membership");

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
        setLoading(false);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 300px)' }}>
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-t2 mb-3 leading-tight font-playfair text-center">Doctor Login</h2>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        <div className="mb-4">
          <label className="text-pbase leading-relaxed mb-2">Email</label>
          <input
            type="email"
            className="rounded-full w-full border border-[#DBDBDB] px-5 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-pbase leading-relaxed mb-2">Password</label>
          <input
            type="password"
            className="rounded-full w-full border border-[#DBDBDB] px-5 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-theme hover:bg-htheme hover:cursor-pointer"} text-white py-3 lg:py-3 rounded-full font-normal font-sans  tracking-tight transition text-pxl`}
        >
        {loading ? "Please wait..." : "Login"}
        </button>
      </form>
    </div>
  );
}
