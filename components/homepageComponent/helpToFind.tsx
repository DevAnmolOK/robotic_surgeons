// export default function HelpToFind() {
//   return (
//     <>
//       <div className="bg-white text-black">
//         <div> We help to find the best surgeon</div>
//       </div>
//     </>
//   );
// }

// components/SurgeonSection.tsx

import Image from "next/image";
import surgeonImage from "@/public/homePage/help.jpg"; // Replace with your image path

export default function HelpToFind() {
  return (
    <section className="px-4 sm:py-5 sm:pb-20 p-5  bg-white ">
      <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto flex flex-col-reverse gap-5 lg:gap-0    lg:flex-row items-center">
        {/* Left Text Card */}
        <div className="bg-theme text-white sm:p-12  p-4  rounded-2xl w-full lg:w-3/5 lg:pr-36 shadow-md lg:-mr-10  z-20">
          {/* <h2 className="text-2xl md:text-2xl 2xl:text-t2 font-semibold mb-4 leading-snug font-playfair"> */}
          <h2 className="text-t2 font-medium mb-4 leading-snug font-playfair">
            We Helps to Find Best Surgeon
          </h2>
          {/* <div className="mb-4 text-base sm:text-base lg:text-lg 2xl:text-xl sans-serif font-light   leading-relaxed tracking-wide  "> */}
          <div className="mb-4 text-pxl sans-serif font-light   leading-relaxed tracking-wide  ">
            Our surgeons are among the most experienced robotic surgery
            specialists in the country.
          </div>
          {/* <div className="mb-6 text-sm sm:text-base lg:text-lg 2xl:text-xl leading-relaxed font-light  tracking-wide"> */}
          <div className="mb-6 text-pxl leading-relaxed font-light  tracking-wide">
            We are a trusted digital healthcare platform committed to making
            quality medical care accessible, convenient, and secure for
            everyone. Whether you need a general consultation or a specialist
            opinion, we connect you with verified doctors across various
            specialties — right from the comfort of your home.
          </div>
          {/* <button className="bg-white text-black font-medium px-2 lg:px-6 2xl:px-10 py-1 lg:py-2 text-base lg:text-lg  xl:mt-4 rounded-full shadow hover:shadow-lg transition"> */}
          <button className="bg-white text-black font-medium px-2 lg:px-6 2xl:px-10 py-1 lg:py-2 text-pxl xl:mt-4 rounded-full shadow hover:shadow-lg transition">
            Learn More
          </button>
        </div>

        {/* Right Image Card */}
        <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-md h-full">
          <Image
            src="/homePage/help.png"
            alt="Robotic Surgery"
            className="object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
