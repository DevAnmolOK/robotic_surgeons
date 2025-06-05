"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import DoctorCard from "./doctorCard";

const filters = [
  {
    label: "Distance",
    options: ["< 5 miles", "< 10 miles", "< 20 miles", "Any"],
  },
  // {
  //   label: "Specialty",
  //   options: ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"],
  // },
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

interface ExploreTopDoctorProps {
  doctors: any;
}

export default function ExploreTopDoctor({ doctors }: ExploreTopDoctorProps) {
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

  const CHUNK = 2;

  const [visibleCount, setVisibleCount] = useState(CHUNK);
  const [loading, setLoading] = useState(false);

  const visibleDoctors = doctors.slice(0, visibleCount);
  const canLoadMore = visibleCount < doctors.length;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + CHUNK);
      setLoading(false);
    }, 1000);
  };

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
          <button className=" h-[3.375rem] bg-theme text-white border border-[#4D4D4D] flex  rounded-full gap-1.5 items-center justify-center px-[1.5rem]">
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
          {visibleDoctors.map((doc: any, index: any) => (
            <div key={index}>
              <DoctorCard doctor={doc} />
            </div>
          ))}
        </div>


        {canLoadMore && (
          <div className="flex align-middle justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={`h-[3.125rem] w-fit rounded-full font-normal font-sans text-pxl leading-[1.625rem] text-white px-5 hover:cursor-pointer ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black"
                }`}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
