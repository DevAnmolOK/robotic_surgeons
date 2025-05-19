import Image from "next/image";
import { IoCheckmarkSharp } from "react-icons/io5";

const points = [
  "24x7 Service",
  "Leading Robotic Surgeons",
  "Verified and Informative Doctor Profiles",
];

export default function RobotAppointment() {
  return (
    <section className="bg-ebg2 py-16 text-black font-sans">
      <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto px-4 flex flex-col-reverse item-center justify-center lg:flex-row items-stretch gap-5 lg:gap-5     h-full">
        {/* Left Content */}
        <div className="w-full lg:w-[35%] h-full gap-2 flex flex-col justify-center ">
          {/* <h2 className="text-2xl md:text-t2 mb-6 leading-tight font-playfair"> */}
          <h2 className="text-t2 mb-3 leading-tight font-playfair">
            Instant Appointment with <br /> Robotic Surgeons
          </h2>
          <p className=" mb-3 text-pbase leading-relaxed">
            Dummy Text Read doctor–produced health and medical information
            written for you to make informed decisions about your health
            concerns.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-5 mb-3">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-center text-black text-pbase"
              >
                <div className=" h-6  w-6 border flex items-center justify-center bg-bgGreen text-white mr-3 rounded-md">
                  <IoCheckmarkSharp className="" size={18} />
                </div>
                {point}
              </li>
            ))}
          </ul>

          <button className="bg-black w-fit text-pxl text-white px-3 sm:px-6 xl:px-8 sm:py-2 py-1 mt-3 rounded-full  font-[400]  hover:shadow-lg transition">
            Book Appointment Now
          </button>
        </div>

        {/* Right Image */}
        <div className=" relative w-full  lg:h-[26.125rem] h-[10rem]  lg:max-w-[65%] flex items-center justify-center">
          <Image
            src="/homePage/robot.png" // update path based on your public folder
            alt="Robotic Surgery Setup"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
