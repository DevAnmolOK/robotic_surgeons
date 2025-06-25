"use client";
import { useState, useMemo } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import DoctorCard from "./doctorCard";
import { useRouter, useSearchParams } from "next/navigation";

const filters = [
  {
    label: "Distance",
    options: ["< 5 miles", "< 10 miles", "< 20 miles", "Any"],
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

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  insurance?: string;
  rating?: number;
  contact_number?: string;
  clinic_name?: string;
  specialty_title?: string;
  address?: string;
  // ...add any other required fields
}

interface ExploreTopDoctorProps {
  doctors: Doctor[];
  onClearFilters?: () => void;
}

export default function ExploreTopDoctor({ doctors, onClearFilters }: ExploreTopDoctorProps) {
  //   const [activeIndex, setActiveIndex] = useState<number | null>(null);
  //   const [selectedFilters, setSelectedFilters] = useState({
  //     Subject: "",
  //     Department: "",
  //     Location: "",
  //     Doctor: "",
  //   });

  const [selected, setSelected] = useState<{ [key: string]: string }>({});
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filtering logic
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      // Distance filter (example: you need to have a distance property in doc)
      if (selected.Distance && selected.Distance !== "Any") {
        // Implement your own logic for distance
        // if (!doc.distance || doc.distance > parseInt(selected.Distance.replace(/[^0-9]/g, ""))) return false;
      }
      
      if (selected.Insurance && doc.insurance !== selected.Insurance) return false;
      
      if (selected.Rating) {
        const minStars = parseInt(selected.Rating[0]);
        if (!doc.rating || doc.rating < minStars) return false;
      }
      return true;
    });
  }, [doctors, selected]);

  const visibleDoctors = filteredDoctors.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredDoctors.length;

  const handleChange = (label: string, value: string) => {
    setSelected((prev) => ({ ...prev, [label]: value }));
    setVisibleCount(10); // Reset pagination on filter change
  };

  // Check if any filter is set or search param exists
  const isAnyFilterSet = Object.values(selected).some(Boolean) || !!searchParams.get("search");

  const handleClearFilters = () => {
    setSelected({});
    setVisibleCount(10);
    // Clear search param from URL
    router.replace("/doctors");
    if (onClearFilters) onClearFilters();
  };

  const handleClearAllFilters = () => {
    router.replace("/doctors"); // This will clear all search params
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

  const CHUNK = 10;

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
        <div className="w-full flex flex-wrap gap-4 items-center justify-between mb-4">
          <div className="flex gap-4">
            <button className="h-[3.375rem] bg-theme text-white border border-[#4D4D4D] flex rounded-full gap-1.5 items-center justify-center px-[1.5rem]">
              <Image src="/icon/setting.png" height={22} width={22} alt="doctor filter" />
              <span className="text-pxl tracking-tight font-normal font-sans">All Filters</span>
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
          {isAnyFilterSet && (
            <button
              className="h-[3.375rem] bg-gray-200 text-black border border-[#4D4D4D] rounded-full px-[1.5rem] font-sans hover:cursor-pointer"
              onClick={handleClearFilters}
              type="button"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* doctor card */}
        {isAnyFilterSet && (
          <div className="mt-2 mb-2 text-pxl font-sans text-gray-700">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
          </div>
        )}
        <div className="space-y-6 mt-[3.25rem]  mb-[2rem]">
          {visibleDoctors.length === 0 ? (
            <div className="text-center text-gray-500">No doctors found for the selected filters.</div>
          ) : (
            visibleDoctors.map((doc) => (
              <div key={doc.id}>
                <DoctorCard doctor={doc} />
              </div>
            ))
          )}
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
