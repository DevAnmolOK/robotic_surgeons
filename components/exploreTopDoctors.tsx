"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
const doctors = [
  {
    name: "Dr. James Whitman",
    designation: "Founder of Cardiac Hospital",
    location: "1601 Avocado Ave, Newport Beach, CA",
    phone: "+1 123-456-7890",
    image: "/doctor/d1.png",
  },
  {
    name: "Dr. Emily Carter",
    designation: "Chief Neurologist",
    location: "250 Palm Street, San Diego, CA",
    phone: "+1 987-654-3210",
    image: "/doctor/d2.png",
  },
  {
    name: "Dr. Liam Johnson",
    designation: "Orthopedic Specialist",
    location: "789 Coastal Rd, Santa Monica, CA",
    phone: "+1 456-789-1234",
    image: "/doctor/d3.png",
  },
  {
    name: "Dr. Sophia Patel",
    designation: "Pediatric Surgeon",
    location: "412 Ocean View Blvd, Malibu, CA",
    phone: "+1 321-654-0987",
    image: "/doctor/d1.png",
  },
];
const filters = [
  {
    label: "Distance",
    options: ["< 5 miles", "< 10 miles", "< 20 miles", "Any"],
  },
  {
    label: "Specialty",
    options: ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"],
  },
  {
    label: "Insurance",
    options: ["Aetna", "Blue Cross", "Cigna", "UnitedHealthcare"],
  },
  {
    label: "Rating",
    options: ["1+ stars", "2+ stars", "3 stars", "4 stars", "5 stars"],
    isStar: true,
  },
];

export default function ExploreTopDoctor() {
  //   const [activeIndex, setActiveIndex] = useState<number | null>(null);
  //   const [selectedFilters, setSelectedFilters] = useState({
  //     Subject: "",
  //     Department: "",
  //     Location: "",
  //     Doctor: "",
  //   });
  const [selected, setSelected] = useState<{ [key: string]: string }>({});
  const handleChange = (label: string, value: string) => {
    setSelected((prev) => ({ ...prev, [label]: value }));
  };

  const getStars = (text: string) => {
    const match = text.match(/^(\d)/);
    if (match) {
      const count = parseInt(match[1]);
      return "⭐".repeat(count);
    }
    return text;
  };
  //   const handleChange = (label: string, value: string) => {
  //     setSelectedFilters((prev) => ({
  //       ...prev,
  //       [label]: value,
  //     }));
  //   };
  return (
    <>
      <div className="sm:max-w-[72vw] max-w-[85vw] flex flex-col w-full mx-auto text-black ">
        <div className="my-[1.75rem]">
          <h2 className="text-t2 font-medium font-playfair ">
            Explore Top Doctors
          </h2>
          <p className=" font-sans text-pxl font-normal tracking-tight">
            Highly recommended doctors, ready to help you feel better.
          </p>
        </div>
        {/* filter */}
        <div className=" w-full flex flex-wrap gap-4 ">
          <button className=" h-[3.375rem] bg-theme text-white border border-[#4D4D4D] flex  rounded-full gap-1.5 items-center justify-center  px-[1.5rem]">
            <Image
              src="/icon/setting.png"
              height={22}
              width={22}
              alt="doctor filter"
            />
            <span className=" text-pxl tracking-tight font-normal font-sans">
              All Filters
            </span>
          </button>
          <div className="flex flex-wrap gap-4 ">
            {filters.map((filter, index) => (
              <div key={index} className="relative">
                <select
                  className="appearance-none flex items-center justify-between text-pxl tracking-tight font-normal  h-[3.375rem] w-[13.313rem]   px-[1.5rem] gap-2 border  border-[#4D4D4D]  py-2 rounded-full "
                  value={selected[filter.label] || ""}
                  onChange={(e) => handleChange(filter.label, e.target.value)}
                >
                  <option value="" disabled>
                    {filter.label}
                  </option>
                  {filter.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {/* {option} */}
                      {filter.isStar ? getStars(option) : option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center ">
                  <FaChevronDown className="text-xs" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* doctor card */}
        <div className="space-y-6 mt-[3.25rem]  mb-[2rem]">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="flex sm:flex-row flex-col  sm:items-start items-center sm:justify-start justify-center  border px-[.5rem] py-[0.75rem] border-[#D9D9D9] "
            >
              {/* image */}
              <div className=" sm:h-[12.375rem] h-[15.375rem] sm:max-w-[12.375rem] max-w-[15.375rem] w-full  relative ">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className=" object-cover"
                  priority
                />
              </div>
              {/* detail */}
              <div className="px-[1.5rem] py-[0.65rem] flex sm:flex-row flex-col items-start justify-center sm:justify-between w-fit sm:w-full gap-4 sm:gap-0  ">
                <div className="sm:items-start items-center sm:justify-start justify-center  ">
                  <div className="text-pxl font-bold font-sans">{doc.name}</div>
                  <p className="font-semibold font-sans text-dt">
                    {doc.designation}
                  </p>
                  <div className="mt-1 mb-[0.5rem]  flex justify-center items-center gap-1.5 text-wrap">
                    <div className="h-[1.125rem] w-[0.938rem]  relative">
                      <Image
                        src="/icon/location.png"
                        alt="doctor location"
                        fill
                        className=" text-theme object-contain"
                      />
                    </div>
                    <span className=" font-sans  text-pbase font-normal">
                      {doc.location}
                    </span>
                  </div>
                  <div className="text-theme flex items-center justify-start gap-1.5">
                    <div className="h-[1.238rem] w-[1.238rem] relative">
                      <Image
                        src="/icon/call.png"
                        alt="doctor location"
                        fill
                        className=" text-theme object-cover"
                      />
                    </div>
                    <a
                      href={`tel:${doc.phone}`}
                      className=" font-bold font-sans text-pbase"
                    >
                      {doc.phone}
                    </a>
                  </div>
                </div>
                <button className="bg-black max-w-[11.75rem] w-full h-[3.125rem] text-white px-6 py-2 rounded-full text-pxl font-normal leading-[1.65rem]">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className=" w-full flex items-center justify-center">
          <button className="h-[3.125rem] w-fit rounded-full bg-black font-normal font-sans text-pxl leading-[1.625rem] text-white px-5">
            Load More
          </button>
        </div>
      </div>
    </>
  );
}
