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
  onSearch: (formData: any) => Promise<void> | void;
}) {

  const [specialtyResults, setSpecialtyResults] = useState<any[]>([]);
  const [addressResults, setAddressResults] = useState<any[]>([]);
  const [skipNextFetch, setSkipNextFetch] = useState(false);
  const [locationSkipFetch, setLocationSkipFetch] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState<{searchTerm: string, location: string}>({searchTerm: '', location: ''});

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

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  //   setIsInitialLoad(false);
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      formData.searchTerm === lastSearch.searchTerm &&
      formData.location === lastSearch.location
    ) {
      return;
    }
    setLoading(true);
    setLastSearch({searchTerm: formData.searchTerm, location: formData.location});
    await Promise.resolve(onSearch(formData));
    setLoading(false);
  };


  // Fetch specialty suggestions
  useEffect(() => {
    if (!formData.searchTerm.trim() || skipNextFetch) {
      setSpecialtyResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestbyname?q=${encodeURIComponent(formData.searchTerm)}`)
        .then(res => res.json())
        .then(data => setSpecialtyResults(data.data || []));
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.searchTerm, skipNextFetch]);



  useEffect(() => {
    if (!formData.location.trim() || locationSkipFetch) {
      setAddressResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresssuggestion?q=${encodeURIComponent(formData.location)}`)
        .then(res => res.json())
        .then(data => setAddressResults(data.data || []));
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.location, locationSkipFetch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsInitialLoad(false);
    if (name === 'searchTerm') setSkipNextFetch(false);
    if (name === 'location') setLocationSkipFetch(false);
  };


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
              <CiSearch className="text-black mr-4 text-p4xl" />
              <input
                type="text"
                name="searchTerm"
                onChange={handleChange}
                value={formData.searchTerm}
                placeholder="Enter a specialty or a name"
                autoComplete="off"
                className="w-full outline-none text-pxl text-black placeholder-black placeholder:text-pxl placeholder:tracking-tight placeholder:font-sans placeholder:font-normal"
              />
              {formData.searchTerm && (
                <TiDelete
                  className="text-black mr-4 text-p4xl hover:cursor-pointer"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, searchTerm: '' }));
                    setSpecialtyResults([]);
                    setSkipNextFetch(false);
                  }}
                />
              )}
            </div>

            {/* Specialty Suggestions Dropdown */}
            {!isInitialLoad && specialtyResults.length > 0 && (
              <div className="absolute z-50 w-full bg-white rounded-2xl shadow-lg max-h-60 overflow-y-auto mt-1">
                {specialtyResults.map((group, i) => (
                  <div key={`specialty-${i}`}>
                    <div className="px-4 py-2 text-md font-semibold text-black uppercase bg-gray-50">
                      {group.label}
                    </div>
                    {group.results.map((item: any, index: number) => (
                      <div
                        key={`specialty-item-${index}`}
                        onClick={() => {
                          setSpecialtyResults([]);
                          setSkipNextFetch(true);
                          setFormData(prev => ({ ...prev, searchTerm: item.value }));
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
          {/* Location Search */}
          <div className="relative w-full">
            <div className="flex items-center bg-white px-7 2xl:px-8 py-2.5 lg:py-3.5 rounded-full w-full">
              <SlLocationPin className="text-black mr-4 text-p3xl" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, state or Zip code"
                autoComplete="off"
                className="w-full outline-none text-pxl text-black placeholder-black placeholder:text-pxl placeholder:tracking-tight placeholder:font-sans placeholder:font-normal"
              />
              {formData.location && (
                <TiDelete
                  className="text-black mr-4 text-p4xl hover:cursor-pointer"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, location: '' }));
                    setAddressResults([]);
                    setLocationSkipFetch(false);
                  }}
                />
              )}
            </div>

            {/* Address Suggestions Dropdown */}
            {!isInitialLoad && addressResults.length > 0 && (
              <div className="absolute z-50 w-full bg-white rounded-2xl shadow-lg max-h-60 overflow-y-auto mt-1">
                {addressResults.map((group, i) => (
                  <div key={`address-${i}`}>
                    {group.results.map((item: any, index: number) => (
                      <div
                        key={`address-item-${index}`}
                        onClick={() => {
                          setAddressResults([]);
                          setLocationSkipFetch(true);
                          setFormData(prev => ({ ...prev, location: item.value }));
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
            className="flex items-center w-fit lg:px-20 px-10 bg-theme hover:bg-htheme text-white py-3 lg:py-4 rounded-full font-normal font-sans  tracking-tight transition text-pxl hover:cursor-pointer"
            disabled={loading}
          >
            <IoPaperPlaneOutline className="text-pxl mr-2  2xl:mr-4 2xl:text-p2xl font-light " />
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}
