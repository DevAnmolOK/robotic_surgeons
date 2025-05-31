'use client';

import { useState } from 'react';
import Image from "next/image";
import { ImArrowUpRight2 } from "react-icons/im";
import { formatDate } from "@/lib/api";
import Post from "@/lib/helper";

export default function BlogsCard({ Posts }: Post) {

    const CHUNK = 4;

    const [visibleCount, setVisibleCount] = useState(CHUNK);
    const [loading, setLoading] = useState(false);

    const visiblePosts = Posts.slice(0, visibleCount);
    const canLoadMore = visibleCount < Posts.length;

    const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + CHUNK);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <>
    <div className="grid gap-x-[1rem] gap-y-[2.75rem] sm:grid-cols-2 lg:grid-cols-4 ">
      {visiblePosts.map((item: any, index: any) => (
          <div
            key={index}
            className="bg-white overflow-hidden rounded-xl custom-shadow sm:p-6  transition p-4"
          >
            <div className="relative  h-bh overflow-hidden mb-4">
              <Image
                src={item.image ?? "https://placehold.co/600x400?text=No Image"}
                alt={item.name ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <div className=" flex flex-col">
              <p className="text-dt text-theme font-semibold mb-1">
                {item.categories[0].name}
              </p>
              <div className="flex justify-between items-center pt-2 ">
                <p className="font-semibold text-pxl">{item.name ?? ''}</p>
                <ImArrowUpRight2 size={16} className="" />
              </div>
              <p className="text-pbase tracking-normal text-cgray py-3 xl:py-4">
                {item.description ?? ''}
              </p>
              <div className="flex  items-center gap-2 pb-3">
                <div className="relative w-[2.5rem] h-[2.5rem]">

                  <Image
                    src={
                      item.author.avatar.url
                        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${item.author.avatar.url}`
                        : 'https://placehold.co/36x36.png'
                    }
                    alt={item.author.name ?? 'auther'}
                    fill
                    className={`rounded-full bg-pink1 object-cover  ${index % 2 === 0 ? "bg-pink1" : "bg-red1"
                      }`}
                  />
                </div>
                <div className="">
                  <p className="text-black text-dt font-medium">
                    {item.author.name ?? ''}
                  </p>
                  <p className="text-cgray text-dt font-normal">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
      ))}
      </div>
      {/* load more */}
      {canLoadMore && (
          <div>
            <div className="flex items-center justify-center mt-[2rem]">
              <button
               onClick={handleLoadMore}
                disabled={loading}
                className={`cursor-pointer ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black" } text-white h-[3rem] max-w-[9rem] w-full font-sans leading-[1.5rem] text-pxl font-normal flex items-center justify-center rounded-full`}>
               {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          </div>
           )}
    </>
  );
}
