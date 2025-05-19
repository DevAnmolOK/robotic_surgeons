import Image from "next/image";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
const doctors = [
  {
    name: "Dr. James Whitman",
    title: "Founder of Cardiac Hospital",
    image: "/doctor/d1.png",
    location: "1601 Avocado Ave, Newport Beach, CA",
    phone: "+1 123–456–7890",
  },
  {
    name: "Dr. Emily Carter",
    title: "Founder of Cardiac Hospital",
    image: "/doctor/d3.png",
    location: "1601 Avocado Ave, Newport Beach, CA",
    phone: "+1 123–456–7890",
  },
  {
    name: "Dr. David Reynolds",
    title: "Founder of Cardiac Hospital",
    image: "/doctor/d1.png",
    location: "1601 Avocado Ave, Newport Beach, CA",
    phone: "+1 123–456–7890",
  },
  {
    name: "Dr. Sarah Mitchell",
    title: "Founder of Cardiac Hospital",
    image: "/doctor/d2.png",
    location: "1601 Avocado Ave, Newport Beach, CA",
    phone: "+1 123–456–7890",
  },
];

export default function TopDoctors() {
  return (
    <section className="  px-4 pt-2xl bg-white text-black font-sans">
      <div className="max-w-[85vw] sm:max-w-[75vw] mx-auto  ">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <div>
            {/* <h2 className="text-3xl md:text-t2  font-medium mb-2 font-playfair"> */}
            <h2 className="text-t2  font-medium mb-2 font-playfair">
              Top Doctors
            </h2>
            {/* <p className="text-black text-base md:text-xl    "> */}
            <p className="text-black text-xl    ">
              Highly recommended doctors, ready to help you feel better.
            </p>
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-full hover:opacity-90 transition text-base md:text-lg xl:px-10 ">
            View All
          </button>
        </div>
        {/* Doctor Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {doctors.map((doc, i) => (
            <div key={i} className="bg-white overflow-hidden ">
              <div className=" h-dh w-dw relative">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="text-pxl font-bold">{doc.name}</p>
                <p className="text-dt font-semibold  mb-2">{doc.title}</p>
                <div className="flex items-start gap-0.5 text-pbase    text-gray-700 mb-1">
                  <SlLocationPin className="mt-1 text-theme" size={14} />
                  {doc.location}
                </div>
                <div className="flex items-center gap-2 text-pbase text-theme font-semibold">
                  <BsTelephone size={14} />
                  {doc.phone}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
