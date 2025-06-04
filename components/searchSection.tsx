"use client";
import React from "react";
import { useState, useEffect} from "react";
import { CiSearch } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";

export default function SeacrhSection({
  onSearch,
}: {
  onSearch: (formData: any) => void;
}) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    searchTerm: "",
    location: "",
    procedure: "All Procedures",
  });

  // ✅ Set form fields from URL on first load
  useEffect(() => {
    const searchTerm = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const procedure = searchParams.get("specialty") || "All Procedures";

    setFormData({
      searchTerm,
      location,
      procedure,
    });
  }, [searchParams]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log("Search Data:", formData);
    // setFormData({
    //   searchTerm: "",
    //   location: "",
    //   procedure: "All Procedures",
    // });

    onSearch(formData);
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 items-center justify-center w-full pb-5"
        >
          {/* Input 1 */}
          <div className="flex items-center bg-white px-7 py-2.5 lg:py-3 rounded-full w-full ">
            <CiSearch className="text-black mr-4  text-p4xl" />
            <input
              type="text"
              name="searchTerm"
              onChange={handleChange}
              value={formData.searchTerm}
              placeholder="Enter a specialty or a name"
              className="w-full outline-none text-pxl text-black placeholder-black placeholder:text-pxl placeholder:tracking-tight placeholder:font-sans placeholder:font-normal"
            />
          </div>

          {/* Input 2 */}
          <div className="flex items-center bg-white px-7 2xl:px-8 py-2 2xl:py-3 rounded-full w-full ">
            <SlLocationPin className="text-black mr-4 text-p3xl  " />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, state or Zip code"
              className="w-full outline-none text-pxl text-black  placeholder-black placeholder:text-pxl placeholder:tracking-tight placeholder:font-sans placeholder:font-normal"
            />
          </div>

          {/* Dropdown */}
          {/* <div className="flex items-center bg-white px-4 py-2 2xl:py-3 rounded-full w-full ">
            <SlLocationPin className="text-black mr-2 text-p3xl " />
            <select
              name="procedure"
              value={formData.procedure}
              onChange={handleChange}
              className="w-full bg-white  text-black outline-none  placeholder-black text-pxl tracking-tight font-sans font-normal"
            >
              <option>All Procedures</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>Neurology</option>
            </select>
          </div>   */}

          {/* Submit Button */}
          <button
            type="submit"
            // className="flex items-center 2xl:px-14 px-6  bg-theme hover:bg-htheme text-white py-2 2xl:py-4 rounded-full font-light text-sm  transition 2xl:text-xl"
            className="flex items-center w-fit lg:px-20 px-10   bg-theme hover:bg-htheme text-white py-3 lg:py-4 rounded-full font-normal font-sans  tracking-tight transition text-pxl hover:cursor-pointer"
          >
            <IoPaperPlaneOutline className="text-pxl mr-2  2xl:mr-4 2xl:text-p2xl font-light " />
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
