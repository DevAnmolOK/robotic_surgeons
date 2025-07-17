"use client";
import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { SlLocationPin } from "react-icons/sl";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchSection({
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
  const [lastSearch, setLastSearch] = useState<{ searchTerm: string; location: string }>({ 
    searchTerm: '', 
    location: '' 
  });

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
    
    // If URL has search parameters, skip showing dropdowns on initial load
    if (searchTerm || location) {
      setSkipNextFetch(true);
      setLocationSkipFetch(true);
    }
    
    // Set initial load to false after URL parameters are loaded
    setIsInitialLoad(false);
    
  }, [searchParams]);

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
        
        // Clear dropdowns when submitting
        setSkipNextFetch(true);
        setLocationSkipFetch(true);

        const params = new URLSearchParams();
        if (formData.searchTerm.trim()) {
          params.set('search', formData.searchTerm.trim().replace(/ /g, '+'));
        }
        if (formData.location.trim()) {
          params.set('location', formData.location.trim().replace(/ /g, '+'));
        }
  
        const newUrl = `/doctors${params.toString() ? `?${params.toString()}` : ''}`;
        window.history.pushState({}, '', newUrl);
  
        setLastSearch({ 
          searchTerm: formData.searchTerm, 
          location: formData.location 
        });
  
        await onSearch(formData);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch specialty suggestions with error handling
  useEffect(() => {
    if (!formData.searchTerm.trim() || skipNextFetch || isInitialLoad) {
      setSpecialtyResults([]);
      return;
    }

    setIsNameLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suggestbyname?q=${encodeURIComponent(formData.searchTerm)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setSpecialtyResults(data.data || []);
      } catch (error) {
        console.error('Error fetching specialty suggestions:', error);
        setSpecialtyResults([]);
      } finally {
        setIsNameLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.searchTerm, skipNextFetch, isInitialLoad]);

  // Fetch address suggestions with error handling
  useEffect(() => {
    if (!formData.location.trim() || locationSkipFetch || isInitialLoad) {
      setAddressResults([]);
      return;
    }

    setIsLocationLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addresssuggestion?q=${encodeURIComponent(formData.location)}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setAddressResults(data.data || []);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
        setAddressResults([]);
      } finally {
        setIsLocationLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.location, locationSkipFetch, isInitialLoad]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'searchTerm') {
      setSkipNextFetch(false);
    }
    if (name === 'location') {
      setLocationSkipFetch(false);
    }
  };

  const handleClearSearchTerm = () => {
    setFormData(prev => ({ ...prev, searchTerm: '' }));
    setSpecialtyResults([]);
    setSkipNextFetch(false);
  };

  const handleClearLocation = () => {
    setFormData(prev => ({ ...prev, location: '' }));
    setAddressResults([]);
    setLocationSkipFetch(false);
  };

  const handleSpecialtySelect = (value: string) => {
    setSpecialtyResults([]);
    setSkipNextFetch(true);
    setFormData(prev => ({ ...prev, searchTerm: value }));
  };

  const handleLocationSelect = (value: string) => {
    setAddressResults([]);
    setLocationSkipFetch(true);
    setFormData(prev => ({ ...prev, location: value }));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center justify-center w-full pb-5"
      >
        {/* Search Term Input */}
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
                onClick={handleClearSearchTerm}
              />
            )}
          </div>

          {/* Specialty Suggestions Dropdown */}
          {!isInitialLoad && formData.searchTerm.trim() && !skipNextFetch && (
            <div className="absolute z-50 w-full bg-white rounded-2xl shadow-lg max-h-60 overflow-y-auto mt-1">
              {isNameLoading ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Loading...
                </div>
              ) : specialtyResults.length > 0 ? (
                specialtyResults.map((group, i) => (
                  <div key={`specialty-group-${i}`}>
                    <div className="px-4 py-2 text-md font-semibold text-black uppercase bg-gray-50">
                      {group.label}
                    </div>
                    {group.results.map((item: any, index: number) => (
                      <div
                        key={`specialty-item-${i}-${index}`}
                        onClick={() => handleSpecialtySelect(item.value)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                      >
                        {item.value}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No results found for "{formData.searchTerm}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Location Input */}
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
                onClick={handleClearLocation}
              />
            )}
          </div>

          {/* Address Suggestions Dropdown */}
          {!isInitialLoad && formData.location.trim() && !locationSkipFetch && (
            <div className="absolute z-50 w-full bg-white rounded-2xl shadow-lg max-h-60 overflow-y-auto mt-1">
              {isLocationLoading ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Loading...
                </div>
              ) : addressResults.length > 0 ? (
                addressResults.map((group, i) => (
                  <div key={`address-group-${i}`}>
                    <div className="px-4 py-2 text-md font-semibold text-black uppercase bg-gray-50">
                      {group.label}
                    </div>
                    {group.results.map((item: any, index: number) => (
                      <div
                        key={`address-item-${i}-${index}`}
                        onClick={() => handleLocationSelect(item.value)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
                      >
                        {item.value}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No locations found for "{formData.location}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center w-fit lg:px-20 px-10 bg-theme hover:bg-htheme text-white py-3 lg:py-4 rounded-full font-normal font-sans tracking-tight transition text-pxl hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <IoPaperPlaneOutline className="text-pxl mr-2 2xl:mr-4 2xl:text-p2xl font-light" />
          {loading ? "Please wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
}