import Image from "next/image";
import About from "@/components/aboutUsPage/about";
import WeAre from "@/components/aboutUsPage/whoWeAre";
import Vision from "@/components/aboutUsPage/vision";
import ChooseUs from "@/components/aboutUsPage/chooseUs";

export default function () {
  return (
    <>
      <div className=" h-full w-full flex items-center justify-center flex-col bg-white">
        {/* hero */}
        <div
          className="relative sm:h-[14.5rem] h-[10rem]  w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/homePage/heroimage.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center font-playfair">
            <h1 className="text-white text-p3xl font-bold">About Us</h1>
          </div>
        </div>
        {/* about us */}
        <About />
        {/* who we are */}
        <WeAre />
        {/* vision */}
        <Vision />
        {/* why chose us0 */}
        <ChooseUs />
      </div>
    </>
  );
}
