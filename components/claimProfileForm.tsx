"use client";
import React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
export default function ClaimProfileForm() {
  const [form, setForm] = useState({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    licenseFile: null as File | null,
    comment: "",
    certify: false,
    acceptTerms: false,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};
  const handleSubmit = () => {};

  return (
    <>
      <div className=" max-w-[59.938rem] w-full rounded-[1.675rem] accordion-shadow ">
        <div className="text-[1.563rem] h-[3.875rem] rounded-t-[1.675rem] flex items-center  leading-[1.875rem] font-bold font-sans text-white bg-theme w-full">
          <span className="pl-[2rem]">Claim your Profile</span>
        </div>
        <div className="mt-[1.25rem] px-[4.5rem]">
          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="space-y-1">
              {["provider", "staff", "third-party"].map((role) => (
                <label
                  key={role}
                  className="block leading-[2.813rem] font-normal text-pxl -sans"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={form.role === role}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {role === "provider" && "I am a provider"}
                  {role === "staff" && "I am a member of a provider’s staff"}
                  {role === "third-party" &&
                    "I am a part of a third–party firm or agency representing this provider."}
                </label>
              ))}font
            </div>

            <div className="  pr-[2rem] ">
              {/* Name Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-[2.75rem]">
                <div className=" flex flex-col gap-2">
                  <label className="text-pbase font-normal">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="border border-[#DBDBDB] h-[2.438rem] w-full hover:border-blue-500 transition"
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className="text-pbase font-normal">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="border border-[#DBDBDB] h-[2.438rem] w-full hover:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-[1.5rem]">
                <div className=" flex flex-col gap-2">
                  <label className="text-pbase font-normal">
                    Personal Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-[#DBDBDB] h-[2.438rem] w-full hover:border-blue-500 transition"
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className="text-pbase font-normal">
                    My Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="border border-[#DBDBDB] h-[2.438rem] w-full hover:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* Organization */}
              <div className="grid grid-cols-1  mt-[1.5rem]  ">
                <div className="flex flex-col gap-2">
                  <label className="text-pbase font-normal">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    className="border border-[#DBDBDB] h-[2.438rem] w-full hover:border-blue-500 transition"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-[1.5rem]">
                <label className="text-pbase font-normal mb-2 block">
                  License or Identity Proof
                </label>
                <div
                  className="flex justify-center items-center h-[6.813rem] border border-[#DBDBDB] cursor-pointer hover:border-blue-500 transition text-center flex-col"
                  // onClick={handleClickUpload}
                  // onDrop={handleFileDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="h-[2.125rem] w-[2.125rem] relative mb-1">
                    <Image
                      src="/icon/upload.png"
                      alt="upload file"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                  <p className="text-pbase font-normal">Upload your Files</p>
                  <p className="text-[8px] text-[#939393]">
                    Drag and Drop file here or click to browse
                  </p>
                  {/* {form.licenseFile && (
                    <p className="text-xs text-gray-500 mt-2">
                      Selected: {form.licenseFile.name}
                    </p>
                  )} */}
                </div>
                <input
                  id="licenseFile"
                  type="file"
                  name="licenseFile"
                  className="sr-only"
                  // onChange={handleFileSelect}
                />
              </div>

              {/* Optional Comment */}
              <div className="grid grid-cols-1  mt-[1.5rem]  ">
                <div className="flex flex-col gap-2">
                  <label className="text-pbase font-normal">
                    Optional Comment
                  </label>
                  <textarea
                    name="comment"
                    value={form.comment}
                    // onChange={handleChange}
                    rows={4}
                    className="border border-[#DBDBDB]  h-[6.813rem]  w-full hover:border-blue-500 transition"
                  />
                </div>
              </div>
              {/* Certification Section */}
              <label className="flex items-start space-x-2  mt-[1.5rem]">
                <input
                  type="checkbox"
                  name="certify"
                  checked={form.certify}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="space-y-2 text-pbase font-normal">
                  <p>I certify and represent that:</p>
                  <p>
                    (i) I am a duly qualified healthcare provider who is
                    licensed to practice medicine and
                  </p>
                  <p>(ii) I am the individual identified above.</p>
                  <p>(ii) I am the individual identified above.</p>
                  <p className=" leading-[1.563rem]">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries
                  </p>
                </span>
              </label>
              {/* Terms */}
              <label className="flex items-start space-x-2 text-pbase font-normal mt-[1rem]  ">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span>
                  I accept the{" "}
                  <a href="#" className=" underline">
                    "Terms of use"
                  </a>{" "}
                  &{" "}
                  <a href="#" className=" underline">
                    "Privacy Policy"
                  </a>
                </span>
              </label>
              {/* submit Button */}
              <button
                type="submit"
                className="h-[3.063rem] bg-black text-white rounded-full text-pxl font-normal leading-[1.631rem] mt-[1.5rem] mb-[2.25rem] px-[1.25rem]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
