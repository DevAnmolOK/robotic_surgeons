import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { IoPaperPlaneOutline } from "react-icons/io5";

export default function SearchDoctor() {
  return (
    <>
      {/* <div>Seacrh doctor section</div> */}
      <div className=" w-full bg-black py-6 z-20 xl:py-16 flex items-center justify-center ">
        <div className="max-w-[75vw] w-full mx-auto px-4 flex flex-col  justify-center">
          <h2 className="text-white text-lg md:text-xl 2xl:text-3xl font-semibold mb-4 text-center 2xl:mb-5">
            Search for Doctors Close to You – Anytime, Anywhere
          </h2>
          <form className="flex flex-col md:flex-row gap-4 items-center justify-center  ">
            {/* Input 1 */}
            <div className="flex items-center bg-white px-7 py-2 2xl:py-3 rounded-full w-full ">
              <CiSearch className="text-black mr-4 2xl:text-4xl" />
              <input
                type="text"
                placeholder="Enter a specialty or a name"
                className="w-full outline-none text-sm text-black placeholder-black 2xl:placeholder:text-xl"
              />
            </div>

            {/* Input 2 */}
            <div className="flex items-center bg-white px-7 2xl:px-8 py-2 2xl:py-3 rounded-full w-full ">
              <SlLocationPin className="text-black mr-4 2xl:text-4xl" />
              <input
                type="text"
                placeholder="City, state or Zip code"
                className="w-full outline-none text-sm text-black placeholder-black  2xl:placeholder:text-xl"
              />
            </div>

            {/* Dropdown */}
            <div className="flex items-center bg-white px-4 py-2 2xl:py-3 rounded-full w-full ">
              <SlLocationPin className="text-black mr-2 2xl:text-4xl text-xl" />
              <select className="w-full bg-white text-sm 2xl:text-xl text-black outline-none">
                <option>All Procedures</option>
                <option>Cardiology</option>
                <option>Orthopedics</option>
                <option>Neurology</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="flex items-center 2xl:px-14 px-6  bg-theme hover:bg-htheme text-white py-2 2xl:py-4 rounded-full font-semibold text-sm  transition 2xl:text-xl"
            >
              <IoPaperPlaneOutline className="text-xl mr-2  2xl:mr-4 2xl:text-2xl " />
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
