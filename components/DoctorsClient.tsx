"use client";

import React, { useState, useEffect } from "react";
import SeacrhSection from "@/components/searchSection";
import ExploreTopDoctor from "@/components/exploreTopDoctors";
import Breadcrumbs from "@/components/Breadcrumbs";
import { searchDoctors } from "@/lib/searchDoctors";
import { useRouter, useSearchParams } from "next/navigation";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
}

type DoctorsClientProps = {
  initialDoctors: Doctor[];
  initialError?: string;
}

export default function DoctorsClient({
  initialDoctors,
  initialError
}: DoctorsClientProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(initialError || "");

  const searchParams = useSearchParams();

//  const handleSearch = async (searchData: any) => {
//   setLoading(true);
//   setErrorMsg("");

//   const { searchTerm, location, procedure } = searchData;
//   const params = new URLSearchParams();

//   if (searchTerm) params.append("search", searchTerm);
//   if (location) params.append("location", location);
//   if (procedure && procedure !== "All Procedures") {
//     params.append("specialty", procedure);
//   }

//   const query = `/doctors?${params.toString()}`;

//   await router.push(query);

//   try {
//     const res = await searchDoctors({ searchTerm, location, procedure });

//     if ("message" in res) {
//       setDoctors([]);
//       setErrorMsg(res.message);
//     } else {
//       setDoctors(res);
//     }
//   } catch (error: any) {
//     console.error("Search failed", error);
//     setErrorMsg("Something went wrong.");
//   } finally {
//     setLoading(false);
//   }
// };

const fetchDoctorsFromURL = async () => {
    setLoading(true);
    setErrorMsg("");

    const searchTerm = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const procedure = searchParams.get("specialty") || "";

    try {
      const res = await searchDoctors({ searchTerm, location, procedure });

      if ("message" in res) {
        setDoctors([]);
        setErrorMsg(res.message);
      } else {
        setDoctors(res);
      }
    } catch (error: any) {
      console.error("Search failed", error);
      setErrorMsg("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorsFromURL();
  }, [searchParams]);

  const router = useRouter();
  
  const handleSearch = async (searchData: any) => {
  setLoading(true);
  setErrorMsg("");

  const { searchTerm, location, procedure } = searchData;
  const params = new URLSearchParams();

  if (searchTerm) params.append("search", searchTerm);
  if (location) params.append("location", location);
  if (procedure && procedure !== "All Procedures") {
    params.append("specialty", procedure);
  }

  const query = `/doctors?${params.toString()}`;

  // Faster transition
  router.replace(query);
};


  return (
    <div className="w-full h-auto flex flex-col bg-white text-black">
      <Breadcrumbs title="Find Doctors" bgImage="/homePage/heroimage.jpg" />
      <div className="md:h-[11.125rem] py-[2.5rem] md:py-0 w-full bg-ebg2 flex items-center justify-center">
        <div className="w-full sm:max-w-[70vw] max-w-[85vw] mx-auto mt-[0.75rem]">
          <SeacrhSection onSearch={handleSearch} />
        </div>
      </div>
      
      {errorMsg && doctors.length == 0 && <p className="text-center text-red-600 mt-4">{errorMsg}</p>}
      {loading && <p className="text-center mt-4">Loading...</p>}
      {!loading && doctors.length > 0 && <ExploreTopDoctor doctors={doctors} />}


    </div>
  );
}
