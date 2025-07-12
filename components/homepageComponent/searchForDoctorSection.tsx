"use client";
import React, { useCallback } from "react";
import SeacrhSection from "../searchSection";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

interface SearchData {
  searchTerm?: string;
  location?: string;
  procedure?: string;
}

export default function SearchDoctor() {
  const router = useRouter();

  // Optimized search handler with debouncing and proper typing
  const handleSearch = useDebouncedCallback((searchData: SearchData) => {
    const { searchTerm, location, procedure } = searchData;
    const params = new URLSearchParams();
    
    if (searchTerm) params.append("search", searchTerm);
    if (location) params.append("location", location);
    if (procedure && procedure !== "All Procedures") {
      params.append("specialty", procedure);
    }

    router.push(`/doctors?${params.toString()}`);
  }, 300);

  // Memoized to prevent unnecessary re-renders of SearchSection
  const memoizedHandleSearch = useCallback(handleSearch, [handleSearch]);

  return (
    <div className="w-full bg-black 2xl:py-12 lg:py-10 py-8 z-20 flex items-center justify-center">
      <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto px-4 flex flex-col items-center justify-center">
        <h2 className="text-white text-pxs font-semibold mb-4 text-center 2xl:mb-5 font-playfair">
          Search for Doctors Close to You - Anytime, Anywhere
        </h2>
        <div className="w-full">
          <SeacrhSection onSearch={memoizedHandleSearch} />
        </div>
      </div>
    </div>
  );
}