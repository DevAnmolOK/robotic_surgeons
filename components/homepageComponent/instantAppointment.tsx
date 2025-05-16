
import Image from "next/image";
import { IoCheckmarkSharp } from "react-icons/io5";

const points = [
  "24x7 Service",
  "Leading Robotic Surgeons",
  "Verified and Informative Doctor Profiles",
];

export default function   RobotAppointment() {
  return (
    <section className="bg-ebg2 py-16 text-black font-sans">
      <div className="max-w-[75vw] w-full mx-auto px-4 flex flex-col-reverse item-center justify-center lg:flex-row items-stretch gap-5 lg:gap-0     h-full">
        {/* Left Content */}
        <div className="w-full lg:w-[30%] h-full ">
          <h2 className="text-2xl md:text-3xl mb-6 leading-tight font-playfair">
            Instant Appointment with <br /> Robotic Surgeons
          </h2>
          <p className=" mb-6 text-base md:text-base leading-relaxed">
            Dummy Text Read doctor–produced health and medical information
            written for you to make informed decisions about your health
            concerns.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-4 mb-5">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-center text-black text-sm md:text-base"
              >
                <div  className=" h-6  w-6 border flex items-center justify-center bg-bgGreen text-white mr-3 rounded-md">
                  <IoCheckmarkSharp  className="" size={18} />
                </div>
                {point}
              </li>
            ))}
          </ul>

          <button className="bg-black text-white px-5 xl:px-8 py-2 rounded-full text-lg hover:shadow-lg transition">
            Book Appointment Now
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[70%]  h-full  ">
          <Image
            src="/homePage/robot.png" // update path based on your public folder
            alt="Robotic Surgery Setup"
            width={800}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
