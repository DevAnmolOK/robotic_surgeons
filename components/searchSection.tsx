"use client";
import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { SlLocationPin } from "react-icons/sl";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

export default function SeacrhSection({
  onSearch,
}: {
  onSearch: (formData: any) => void;
}) {

  const [groupedResults, setGroupedResults] = useState<any[]>([]);
  const [skipNextFetch, setSkipNextFetch] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
    setIsInitialLoad(false);
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


  useEffect(() => {
    if (!formData.searchTerm.trim() || skipNextFetch || isInitialLoad) {
      setGroupedResults([]);
      setSkipNextFetch(false); // reset skip
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/autocomplete?q=${formData.searchTerm}`
        );
        const result = await res.json();
        setGroupedResults(result.data);
      } catch (err) {
        console.error(err);
      }
    };

    const delay = setTimeout(fetchResults, 300);
    return () => clearTimeout(delay);
  }, [formData.searchTerm]);


  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 items-center justify-center w-full pb-5"
        >
          {/* Input 1 */}
          <div className="relative w-full">
            <div className="flex items-center bg-white px-7 py-2.5 lg:py-3 rounded-full w-full">
              <CiSearch className="text-black mr-4  text-p4xl" />
              <input
                type="text"
                name="searchTerm"
                onChange={handleChange}
                value={formData.searchTerm}
                placeholder="Enter a specialty or a name"
                autoComplete="off"
                className="w-full outline-none text-pxl text-black placeholder-black placeholder:text-pxl placeholder:tracking-tight placeholder:font-sans placeholder:font-normal"
              />
              {(formData.searchTerm || groupedResults.length > 0) &&  (<TiDelete className="text-black mr-4  text-p4xl hover:cursor-pointer" onClick={() => {
                setFormData(prev => ({ ...prev, searchTerm: '' }));
                setGroupedResults([]);
                setSkipNextFetch(false);
              }} />
              )}
            </div>

            {/* Auto-suggestion dropdown */}
            {!isInitialLoad && groupedResults.length > 0 && (
              <div className="absolute z-50 w-full bg-white rounded-2xl shadow-lg max-h-60 overflow-y-auto mt-1">
                {groupedResults.map((group, i) => (
                  <div key={i}>
                    <div className="px-4 py-2 text-md font-semibold text-black uppercase bg-gray-50">
                      {group.label}
                    </div>
                    {group.results.map((item: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => {
                          setGroupedResults([]);
                          setSkipNextFetch(true);
                          setFormData((prev) => ({ ...prev, searchTerm: item.value }));
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                      >
                        {item.value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

          </div>


          {/* Input 2 */}
          <div className="relative w-full">
          <div className="flex items-center bg-white px-7 2xl:px-8 py-2.5 lg:py-3.5 rounded-full w-full ">
            <SlLocationPin className="text-black mr-4 text-p3xl  " />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, state or Zip code"
              autoComplete="off"
              className="w-full outline-none text-pxl text-black placeholder-black placeholder:text-pxl placeholder:tracking-tight placeholder:font-sans placeholder:font-normal"
            />
           {(formData.location || groupedResults.length > 0) &&  (<TiDelete className="text-black mr-4  text-p4xl hover:cursor-pointer" onClick={() => {
                setFormData(prev => ({ ...prev, location: '' }))
              }} />
              )}
          </div>
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
