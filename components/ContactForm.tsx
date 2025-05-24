"use client";
import { useState } from "react";

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}
type FormErrors = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);


  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/inquiry`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
          }),
        });

        const result = await res.json();

        if (res.ok) {
          setResponse('Message sent successfully!');
          console.log("Form submitted:", formData);
          setFormData({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
          setErrors({});

        } else {
          setResponse(result.message || 'Submission failed');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setResponse('An error occurred. Please try again.');
      }
      finally {
        setLoading(false); // Reset loading state
      }
    }
  };
  return (
    <>
      <div>
        <form className="font-sans" onSubmit={handleSubmit}>
          {/* firstname lastname */}
          <div className="flex flex-row gap-[2rem] mb-[2.25rem]">
            <div className="max-w-[18rem] w-full mx-auto">
              <label className="font-medium text-black text-pbase">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className={`w-full  py-[.5rem]  ${errors.firstname ? "border-red-500" : "border-placeholder"
                  }  border-b-2 focus:border-b-[3px]  focus:border-theme  text-black  outline-none transition duration-200 placeholder-placeholder`}
                placeholder="John"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm">{errors.firstname}</p>
              )}
            </div>
            <div className="max-w-[18rem] w-full mx-auto">
              <label className="font-medium text-black text-pbase">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className={`w-full  py-[.5rem] ${errors.lastname ? "border-red-500" : "border-placeholder"
                  }  border-b-2 focus:border-b-[3px] focus:border-theme  text-black  outline-none transition duration-200 placeholder-placeholder`}
                placeholder="Deo"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm">{errors.lastname}</p>
              )}
            </div>
          </div>
          {/* email phone no */}
          <div className="flex flex-row gap-[2rem]  mb-[2.25rem]">
            <div className="max-w-[18rem] w-full mx-auto">
              <label className="font-medium text-black text-pbase">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full  py-[.5rem]  ${errors.email ? "border-red-500" : "border-placeholder"
                  }   border-b-2 focus:border-b-[3px]  focus:border-theme  text-black  outline-none transition duration-200 placeholder-placeholder`}
                placeholder="john@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="max-w-[18rem] w-full mx-auto">
              <label className="font-medium text-black text-pbase">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full  py-[.5rem] ${errors.phone ? "border-red-500" : "border-placeholder"
                  }    border-b-2 focus:border-b-[3px] focus:border-theme  text-black  outline-none transition duration-200 placeholder-placeholder`}
                placeholder="+1 012 3456 789"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>
          {/* radio */}
          <div className=" flex flex-col gap-[1rem] mb-[2.5rem]">
            <p className="text-black text-dt font-semibold">Select Subject?</p>
            <div className="flex items-center gap-6 text-black">
              <div className="flex gap-[0.5rem]">
                <input
                  type="radio"
                  id="subject1"
                  name="subject"
                  value="General Inquiry"
                  checked={formData.subject === "General Inquiry"}
                  onChange={handleChange}
                />
                <label className="cursor-pointer text-pbase font-medium">
                  General Inquiry
                </label>
              </div>
              <div className="flex gap-[0.5rem]">
                <input
                  type="radio"
                  id="subject2"
                  name="subject"
                  value="Support"
                  checked={formData.subject === "Support"}
                  onChange={handleChange}
                />
                <label className="cursor-pointer text-pbase font-medium">
                  Support
                </label>
              </div>
              <div className="flex gap-[0.5rem]">
                <input
                  type="radio"
                  id="subject3"
                  name="subject"
                  value="Feedback"
                  checked={formData.subject === "Feedback"}
                  onChange={handleChange}
                />
                <label className="cursor-pointer text-pbase font-medium">
                  Feedback
                </label>
              </div>
            </div>
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject}</p>
            )}
          </div>
          {/* message */}
          <div className="flex flex-col mb-[3rem]">
            <p className="text-pbase font-medium text-black">Message</p>
            <div>
              <input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full  py-[0.5rem] ${errors.message ? "border-red-500" : "border-placeholder"
                  }   border-b-2 focus:border-b-[3px] focus:border-theme  text-black  outline-none transition duration-200 placeholder-placeholder`}
                placeholder="Write Your Message"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`max-w-[12.813rem] rounded-[6.25rem] h-[2.813rem] ${loading ? 'bg-gray-400 cursor-not-allowed' : "bg-black"} text-white w-full text-pxl font-normal`}
          >
            {loading ? 'Please wait...' : 'Send Message'}
          </button>
        </form>
        {response && <p className="mt-4">{response}</p>}
      </div>
    </>
  );
}
