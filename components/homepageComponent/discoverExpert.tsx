import Image from "next/image";
import React from "react";
import Link from "next/link";

const DiscoverExpert = async () => {

  const specialitiesData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/doctor-categories?per_page=12`
  );

  const specialityData = await specialitiesData.json();
  
  const specialityItems = Array.isArray(specialityData.data.items)
    ? specialityData.data.items
    : [];

  const filteredspecialities = specialityItems.filter(
    (item: any) => item.is_featured === 1
  );

  return (
    <>
      {filteredspecialities.length > 0 &&
        <section className="px-4 text-center bg-white text-black pt-pbn pb-axl font-sans">
          <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto border-b border-gray-300 pb-16 ">
            <h2 className="text-t2 mb-1 font-playfair font-medium">
              Discover Expert by Concern
            </h2>

            <p className=" mb-10 text-pxl  font-sans tracking-tight ">
              Select a specialty to find the right doctor for your needs
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6  justify-items-center">
              {filteredspecialities.map((item: any, index: any) => (
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
          </div>
        </section>
      }
    </>

  );
};

export default DiscoverExpert;
