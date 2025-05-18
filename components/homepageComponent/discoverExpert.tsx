"use client";
import Image from "next/image";

const experts = [
  { id: 1, title: "Internal Medicine", icon: "/expert/first-aid.png" },
  { id: 2, title: "Orthopaedic Surgery", icon: "/expert/healthy.png" },
  { id: 3, title: "Ophthalmology", icon: "/expert/retina.png" },
  { id: 4, title: "Dermatology", icon: "/expert/hydrated-skin.png" },
  { id: 5, title: "Urology", icon: "/expert/urology.png" },
  { id: 6, title: "Gynaecology", icon: "/expert/uterus.png" },
];

export default function DiscoverExpert() {
  return (
    <section className=" px-4 text-center bg-white text-black pt-24 pb-14 font-sans">
      <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto border-b border-gray-300 pb-16 ">
        {/* <h2 className="text-2xl md:text-t2  mb-2 font-playfair font-normal"> */}
        <h2 className="text-t2 mb-1 font-playfair font-medium">
          Discover Expert by Concern
        {/* </h2> */}
        </h2>
        {/* <p className=" mb-10 text-xs sm:text-sm md:text-xl font-sans tracking-tight "> */}
        <p className=" mb-10 text-pxl  font-sans tracking-tight ">
          Select a specialty to find the right doctor for your needs.
        </p>

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 border justify-items-start"> */}
        <div className="flex flex-wrap justify-between gap-6 ">
          {experts.map((expert) => (
            <div key={expert.id} className="flex flex-col items-center ">
              <div className="sm:w-28 sm:h-28 h-24 w-24 rounded-full border border-black flex items-center justify-center hover:shadow-lg bg-ebg transition">
                <Image
                  src={expert.icon}
                  alt={expert.title}
                  width={55}
                  height={55}
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-xs sm:text-sm md:text-lg font-medium font-sans">
                {expert.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
