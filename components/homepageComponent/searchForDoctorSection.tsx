"use client";
import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { IoPaperPlaneOutline } from "react-icons/io5";
import SeacrhSection from "../searchSection";
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
          <div className="  w-full ">
            <SeacrhSection />
          </div>
        </div>
      </div>
    </>
  );
}
