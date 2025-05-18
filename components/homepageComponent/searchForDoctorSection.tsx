"use client";
import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { IoPaperPlaneOutline } from "react-icons/io5";

export default function SearchDoctor() {
  const [formData, setFormData] = useState({
    searchTerm: "",
    location: "",
    procedure: "All Procedures",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log("Search Data:", formData);
    setFormData({
      searchTerm: "",
      location: "",
      procedure: "All Procedures",
    });
  };
  return (
    <>
      {/* <div>Seacrh doctor section</div> */}
      <div className=" w-full bg-black 2xl:py-12 lg:py-10 py-8 z-20   flex items-center justify-center ">
        <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto px-4 flex flex-col items-center  justify-center">
          {/* <h2 className="text-white text-lg md:text-xl 2xl:text-3xl font-semibold mb-4 text-center 2xl:mb-5 font-playfair"> */}
          <h2 className="text-white  text-pxs font-semibold mb-4 text-center 2xl:mb-5 font-playfair">
            Search for Doctors Close to You - Anytime, Anywhere
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 items-center justify-center w-full pb-5"
          >
            {/* Input 1 */}
            <div className="flex items-center bg-white px-7 py-2 2xl:py-3 rounded-full w-full ">
              <CiSearch className="text-black mr-4 2xl:text-4xl" />
              <input
                type="text"
                name="searchTerm"
                onChange={handleChange}
                value={formData.searchTerm}
                placeholder="Enter a specialty or a name"
                className="w-full outline-none text-sm text-black placeholder-black 2xl:placeholder:text-xl"
              />
            </div>

            {/* Input 2 */}
            <div className="flex items-center bg-white px-7 2xl:px-8 py-2 2xl:py-3 rounded-full w-full ">
              <SlLocationPin className="text-black mr-4 2xl:text-4xl" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, state or Zip code"
                className="w-full outline-none text-sm text-black placeholder-black  2xl:placeholder:text-xl"
              />
            </div>

            {/* Dropdown */}
            <div className="flex items-center bg-white px-4 py-2 2xl:py-3 rounded-full w-full ">
              <SlLocationPin className="text-black mr-2 2xl:text-4xl text-xl" />
              <select
                name="procedure"
                value={formData.procedure}
                onChange={handleChange}
                className="w-full bg-white text-sm 2xl:text-xl text-black outline-none"
              >
                <option>All Procedures</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
                <option>Neurology</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // className="flex items-center 2xl:px-14 px-6  bg-theme hover:bg-htheme text-white py-2 2xl:py-4 rounded-full font-light text-sm  transition 2xl:text-xl"
              className="flex items-center w-fit 2xl:px-20   bg-theme hover:bg-htheme text-white py-2 2xl:py-4 rounded-full font-light text-sm  transition 2xl:text-xl"
            >
              <IoPaperPlaneOutline className="text-xl mr-2  2xl:mr-4 2xl:text-2xl font-light " />
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
