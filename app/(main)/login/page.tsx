"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const doctorId = localStorage.getItem("doctor_id");
    const doctorEmail = localStorage.getItem("doctor_email");
    const doctorToken = localStorage.getItem("token");

    if (doctorEmail && doctorToken) {
      router.push("/membership");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});
    

    // Validation
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = "Invalid email format";
    if (!password.trim()) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setLoading(false);
      return;
    }

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
      window.dispatchEvent(new Event("login-status-changed"));
      router.push("/membership");

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
        setLoading(false);
      }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-row min-h-screen justify-center items-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
    <div className="max-w-md  mx-auto p-6 bg-white rounded-lg shadow-md">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg w-full max-w-sm"
      >
        <h2 className="text-t2 mb-3 leading-tight font-playfair text-center">Doctor Login</h2>
        
        <div className="mb-4">
          <label className="text-pbase leading-relaxed mb-2">Email</label>
          <input
            type="email"
            className="rounded-full w-full border border-[#DBDBDB] px-5 py-3"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
          />
          {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
        </div>

        <div className="mb-4 relative">
          <label className="text-pbase leading-relaxed mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="rounded-full w-full border border-[#DBDBDB] px-5 py-3"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
          <button
          type="button"
          className="absolute cursor-pointer top-11 right-4"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <BsEyeSlash /> : <BsEye />}
        </button>
          {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}
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

      <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
            Forgot Password
          </Link>
        </div>

      {error && <div className="mt-4 p-3 text-red-700">{error}</div>}
    </div>
    </div>
  );
}
