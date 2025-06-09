"use client";
import React from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import { CiFileOn } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.role) newErrors.role = "Please select a role";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        form.phone
      )
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!form.organization.trim())
      newErrors.organization = "Organization is required";
    if (!form.licenseFile)
      newErrors.licenseFile = "Please upload a license or ID proof";
    if (!form.comment.trim()) newErrors.comment = "Enter your comment";
    if (!form.certify) newErrors.certify = "You must certify your identity";
    if (!form.acceptTerms) newErrors.acceptTerms = "You must accept the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;

    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (target as HTMLInputElement).checked,
      }));
    } else if (type === "file") {
      const file = (target as HTMLInputElement).files?.[0];
      setForm((prev) => ({ ...prev, licenseFile: file || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, licenseFile: file }));
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (validateForm()) {
    setLoading(true);
    const formData = new FormData();

    if (form.licenseFile) {
      formData.append("file", form.licenseFile); // 👈 must match Laravel key
    }

    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('organization', form.organization);
    formData.append('role', form.role);
    formData.append('acceptTerms', form.acceptTerms ? '1' : '0');
    formData.append('certify', form.certify ? '1' : '0');
    formData.append('comment', form.comment);
    

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const doctorId = localStorage.getItem('doctor_id');

    if(doctorId){
      formData.append('doctor_id', doctorId);
    }

    if (!form.certify && !form.acceptTerms) {
      alert("Please agree to the certification and term before submitting");
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/claim-profile`, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey || '',
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      setResponse(data.message || '');
      console.log('Uploaded:', data);
    } else {
      console.error('Upload error:', data);
    }
    setForm({
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      licenseFile: null,
      comment: "",
      certify: false,
      acceptTerms: false,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setLoading(false);
    localStorage.removeItem('doctor_id');
  }
  };

  return (
    <>
      <div className=" max-w-[59.938rem] w-full rounded-[1.675rem] accordion-shadow ">
        <div className="text-[1.563rem] h-[3.875rem] rounded-t-[1.675rem] flex items-center  leading-[1.875rem] font-bold font-sans text-white bg-theme w-full">
          <span className="pl-[2rem]">Claim your Profile</span>
        </div>
        <div className="mt-[1.25rem] sm:px-[4.5rem] px-[1rem] ">
          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="sm:space-y-1">
              {["provider", "staff", "third-party"].map((role) => (
                <label
                  key={role}
                  className="block sm:leading-[2.813rem] leading-[2rem] font-normal text-pxl -sans"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={form.role === role}
                    onChange={handleChange}
                    className="mr-2 cursor-pointer"
                  />
                  {role === "provider" && "I am a provider"}
                  {role === "staff" && "I am a member of a provider’s staff"}
                  {role === "third-party" &&
                    "I am a part of a third–party firm or agency representing this provider."}
                </label>
              ))}
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>

            <div className="  sm:pr-[2rem] ">
              {/* Name Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  mt-[2.75rem]">
                <div className=" flex flex-col gap-2">
                  <label className="text-pbase font-normal">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className={` h-[2.438rem]  border ${errors.firstName ? "border-red-500" : "border-[#DBDBDB]"
                      } focus:border-theme focus:border-2 focus:rounded-[0.25rem] focus:ring-2 text-black focus:ring-blue-50 outline-none transition duration-200 pl-[0.75rem]`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div className=" flex flex-col gap-2">
                  <label className="text-pbase font-normal">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className={` h-[2.438rem]  border ${errors.lastName ? "border-red-500" : "border-[#DBDBDB]"
                      } focus:border-theme focus:border-2 focus:rounded-[0.25rem] focus:ring-2 text-black focus:ring-blue-50 outline-none transition duration-200 pl-[0.75rem]`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
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
                    className={` h-[2.438rem]  border ${errors.email ? "border-red-500" : "border-[#DBDBDB]"
                      } focus:border-theme focus:border-2 focus:rounded-[0.25rem] focus:ring-2 text-black focus:ring-blue-50 outline-none transition duration-200 pl-[0.75rem]`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
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
                    className={` h-[2.438rem]  border ${errors.phone ? "border-red-500" : "border-[#DBDBDB]"
                      } focus:border-theme focus:border-2 focus:rounded-[0.25rem] focus:ring-2 text-black focus:ring-blue-50 outline-none transition duration-200 pl-[0.75rem]`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
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
                    className={` h-[2.438rem]  border ${errors.organization
                      ? "border-red-500"
                      : "border-[#DBDBDB]"
                      } focus:border-theme focus:border-2 focus:rounded-[0.25rem] focus:ring-2 text-black focus:ring-blue-50 outline-none transition duration-200 pl-[0.75rem]`}
                  />
                  {errors.organization && (
                    <p className="text-red-500 text-sm">
                      {errors.organization}
                    </p>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-[1.5rem]">
                <label className="text-pbase font-normal mb-2 block">
                  License or Identity Proof
                </label>
                <div
                  className="flex  items-center justify-center h-[6.813rem] border border-[#DBDBDB] cursor-pointer hover:border-blue-500 focus:border-theme transition text-center flex-col"
                  // className={`flex  items-center justify-center h-[6.813rem] cursor-pointer text-center border ${
                  //   errors.licenseFile ? "border-red-500" : "border-[#DBDBDB]"
                  // } focus:border-theme focus:border-2 focus:rounded-[0.25rem] focus:ring-2 text-black focus:ring-blue-50 outline-none transition duration-200 `}
                  onClick={handleClickUpload}
                  onDrop={handleFileDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {form.licenseFile ? (
                    <></>
                  ) : (
                    <>
                      <div className="h-[2.125rem] w-[2.125rem] relative mb-1">
                        <Image
                          src="/icon/upload.png"
                          alt="upload file"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>
                    </>
                  )}

                  {form.licenseFile ? (
                    <>
                      <div className="relative flex items-center justify-center flex-row w-full  h-full ">
                        <div className=" ">
                          <p className="text-pbase font-normal flex items-center gap-1">
                            <CiFileOn className=" text-[2.125rem]" />
                            {form.licenseFile.type.split("/")[1].toUpperCase()}
                          </p>
                          <p className="text-[1.25rem] text-[#939393] mt-1">
                            {form.licenseFile.name}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setForm((prev) => ({ ...prev, licenseFile: null }));
                          }}
                          className=" absolute -top-0 right-0   text-black rounded-full  "
                        >
                          <MdDeleteOutline className="text-[1.5rem]" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-pbase font-normal">
                        Upload your Files
                      </p>
                      <p className="text-[12px] text-[#939393]">
                        Drag and Drop file here or click to browse
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="licenseFile"
                  type="file"
                  name="licenseFile"
                  className="sr-only"
                  ref={fileInputRef}
                  onChange={handleChange}
                />
                {errors.licenseFile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.licenseFile}
                  </p>
                )}
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
                    onChange={handleChange}
                    rows={4}
                    className={` h-[6.813rem]  border ${errors.comment ? "border-red-500" : "border-[#DBDBDB]"
                      } focus:border-theme focus:border-2 focus:rounded-[0.25rem] focus:ring-2 text-black focus:ring-blue-50 outline-none transition duration-200 pl-[0.75rem]`}
                  />
                  {errors.comment && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.comment}
                    </p>
                  )}
                </div>
              </div>
              {/* Certification Section */}
              <label className="flex items-start space-x-2  mt-[1.5rem]">
                <input
                  type="checkbox"
                  name="certify"
                  checked={form.certify}
                  onChange={handleChange}
                  className="mt-1 cursor-pointer"
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
              {errors.certify && (
                <p className="text-red-500 text-sm mt-1">{errors.certify}</p>
              )}
              {/* Terms */}
              <label className="flex items-start space-x-2 text-pbase font-normal mt-[1rem]  ">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 cursor-pointer"
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
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.acceptTerms}
                </p>
              )}
              {/* submit Button */}
              <button
                type="submit"
                className={`h-[3.063rem] ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"} rounded-full text-pxl font-normal leading-[1.631rem] mt-[1.5rem] mb-[2.25rem] px-[1.25rem] cursor-pointer`}
              >
                {loading ? "Please Wait..." : "Submit"}
              </button>
            </div>
            {response && <p className="mt-4">{response}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
