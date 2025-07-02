"use client";
import React, { useEffect, useState } from 'react';
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from 'next/image';
import Link from 'next/link';

const PER_PAGE = 12; // or whatever you want

function chunkArray<T>(array: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const Categories = () => {
  const [chunks, setChunks] = useState<any[][]>([]);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingInitial(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/doctor-categories?per_page=1000`
      );
      const data = await res.json();
      const items = Array.isArray(data.data.items) ? data.data.items : [];
      setChunks(chunkArray(items, PER_PAGE));
      setLoadingInitial(false);
    };
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setCurrentChunk((prev) => prev + 1);
      setLoadingMore(false);
    }, 400); // Simulate loading, adjust/remove as needed
  };

  const displayedItems = chunks.slice(0, currentChunk + 1).flat();

  return (
    <>
      <Breadcrumbs title="Categories" bgImage="/homePage/heroimage.jpg" />
      
        <section className="px-4 text-center bg-white text-black pt-pbn pb-axl font-sans">
          <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto pb-16 ">
            <h2 className=" mb-10 text-t2 mb-1 font-playfair font-medium ">
              Discover Expert by Speciality
            </h2>
            {/* <p className=" mb-10 text-pxl  font-sans tracking-tight ">
              Select a specialty to find the right doctor for your needs
            </p> */}
            {loadingInitial ? (
              <div className="flex justify-center items-center min-h-[200px] text-xl">Loading...</div>
            ) : (
              displayedItems.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6  justify-items-center">
                  {displayedItems.map((item: any, index: any) => (
                    <Link key={index} href={`/doctors?search=${encodeURIComponent(item.title.toString().toLowerCase())}`}>
                      <div className="flex flex-col items-center ">
                        <div className="sm:w-[7rem] sm:h-[7rem] h-[6rem] w-[6rem] rounded-full border border-black flex items-center justify-center hover:shadow-lg bg-ebg transition hover:cursor-pointer">
                          <Image
                            src={
                              item.image
                                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${item.image}`
                                : "https://placehold.co/55x55.png"
                            }
                            alt={item.title}
                            width={55}
                            height={55}
                            className="object-contain"
                          />
                        </div>
                        <p className="mt-3 text-plg font-medium font-sans capitalize">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            )}
            
            {currentChunk < chunks.length - 1 && (
              <button
                className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition disabled:opacity-50"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            )}
          </div>
        </section>
     
    </>
  );
};

export default Categories;