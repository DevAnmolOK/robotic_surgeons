"use client";
import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { SlLocationPin } from "react-icons/sl";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useSearchParams, useRouter } from "next/navigation";

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
  const [isNameLoading, setIsNameLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [lastSearch, setLastSearch] = useState<{ searchTerm: string, location: string }>({ searchTerm: '', location: '' });

  const searchParams = useSearchParams();
  const router = useRouter();

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

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   if (
  //     formData.searchTerm === lastSearch.searchTerm &&
  //     formData.location === lastSearch.location
  //   ) {
  //     return;
  //   }
  //   setLoading(true);
  //   setSpecialtyResults([]);
  //   setAddressResults([]);
  //   setIsInitialLoad(true)
  //   setLastSearch({ searchTerm: formData.searchTerm, location: formData.location });
  //   await Promise.resolve(onSearch(formData));
  //   setLoading(false);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Early return if search hasn't changed
    if (formData.searchTerm === lastSearch.searchTerm && 
        formData.location === lastSearch.location) {
      return;
    }
  
    if (!loading) {
      try {
        setLoading(true);
        setSpecialtyResults([]);
        setAddressResults([]);
        setIsInitialLoad(true);
        
        // Build the query string according to your format
        const params = new URLSearchParams();
        if (formData.searchTerm) {
          params.set('search', formData.searchTerm.replace(/ /g, '+'));
        }
        if (formData.location) {
          // Assuming location should also be in the query if needed
          params.set('location', formData.location.replace(/ /g, '+'));
        }
  
        // Update URL without page reload
        const newUrl = `/doctors${params.toString() ? `?${params.toString()}` : ''}`;
        window.history.pushState({}, '', newUrl);
  
        setLastSearch({ 
          searchTerm: formData.searchTerm, 
          location: formData.location 
        });
  
        await onSearch(formData);
      } catch (error) {
        console.error('Search failed:', error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    }
  };


  // Fetch specialty suggestions
  useEffect(() => {
    if (!formData.searchTerm.trim() || skipNextFetch) {
      setSpecialtyResults([]);
      return;
    }

    setIsNameLoading(false);
    const timer = setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestbyname?q=${encodeURIComponent(formData.searchTerm)}`)
        .then(res => res.json())
        .then(data => setSpecialtyResults(data.data || []))
        .finally(() => setIsNameLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.searchTerm, skipNextFetch]);



  useEffect(() => {
    if (!formData.location.trim() || locationSkipFetch) {
      setAddressResults([]);
      return;
    }

    setIsLocationLoading(true);
    const timer = setTimeout(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresssuggestion?q=${encodeURIComponent(formData.location)}`)
        .then(res => res.json())
        .then(data => setAddressResults(data.data || []))
        .finally(() => setIsLocationLoading(false));
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
                    // if (!formData.location) {
                    //   router.push('/doctors');
                    // }
                  }}
                />
              )}
            </div>

            {/* Specialty Suggestions Dropdown */}
            {!isInitialLoad && (
              <div className="absolute z-50 w-full bg-white rounded-2xl shadow-lg max-h-60 overflow-y-auto mt-1">
                {specialtyResults.length > 0 ? (
                  specialtyResults.map((group: { label: string, results: Array<{ value: string }> }, groupIndex: number) => (
                    <div key={`group-${groupIndex}`}>
                      {group.results.length > 0 && (
                        <>
                          <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                            {group.label}
                          </div>
                          {group.results.map((item: any, itemIndex: number) => (
                            <button
                              key={`item-${groupIndex}-${itemIndex}`}
                              type="button"
                              onClick={() => {
                                setSpecialtyResults([]);
                                setSkipNextFetch(true);
                                setFormData(prev => ({ ...prev, searchTerm: item.value }));
                                setIsNameLoading(true);
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 transition-colors duration-100"
                            >
                              {item.value}
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  ))
                ) : formData.searchTerm.trim() && !isNameLoading ? (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No results found for "{formData.searchTerm}"
                  </div>
                ) : null}
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
                    // if (formData.searchTerm) {
                    //   router.push(`/doctors?search=${formData.searchTerm}`);
                    // } else {
                    //   router.push('/doctors');
                    // }
                  }}
                />
              )}
            </div>

            {/* Address Suggestions Dropdown */}
            {!isInitialLoad && (
              <div className="absolute z-50 w-full bg-white rounded-2xl shadow-lg max-h-60 overflow-y-auto mt-1">
                {addressResults.length > 0 ? (
                  addressResults.map((group, groupIndex) => (
                    <div key={`address-group-${groupIndex}`}>
                      {group.results.map((item: any, itemIndex: number) => (
                        <button
                          key={`address-item-${groupIndex}-${itemIndex}`}
                          type="button"
                          onClick={() => {
                            setAddressResults([]);
                            setLocationSkipFetch(true);
                            setFormData(prev => ({ ...prev, location: item.value }));
                            setIsLocationLoading(true);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700"
                        >
                          {item.value}
                        </button>
                      ))}
                    </div>
                  ))
                ) : formData.location.trim() && !isLocationLoading ? (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No locations found for "{formData.location}"
                  </div>
                ) : null}
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
