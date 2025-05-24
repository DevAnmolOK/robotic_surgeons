import Image from "next/image";
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
        <div className="px-6 pb-[3rem] w-full h-auto pt-[6rem] bg-white">
          <div className="sm:max-w-[73vw] max-w-[85vw] h-[37.5rem] mx-auto flex flex-col lg:flex-row  gap-[3rem]">
            {/* Text Section */}
            <div className="w-[52%] flex flex-col pl-[1rem] pr-[2rem] pt-[2rem] ">
              <p className="text-plg text-black mb-[.5rem] font-normal font-sans">
                About Us
              </p>
              <h2 className="text-t2 font-medium text-black leading-tight mb-[1.5rem] font-playfair">
                Redefining Surgery Through Precision
                <br className="hidden md:block" /> and Innovation
              </h2>
              <p className="text-black text-pxl mb-[1rem] font-normal font-sans leading-relaxed">
                We are pioneers in the field of robotic-assisted surgery,
                combining cutting-edge technology with expert surgical care to
                offer patients a safer, more precise, and less invasive
                alternative to traditional surgery.
              </p>
              <p className="text-black text-pxl  font-normal font-sansleading-relaxed">
                Our team of highly trained surgeons and healthcare professionals
                is committed to transforming surgical outcomes through the use
                of advanced robotic systems that enhance dexterity, accuracy,
                and control. With the help of state-of-the-art equipment like
                the da Vinci Surgical System and other robotic platforms, we
                perform a wide range of procedures in urology, gynecology,
                general surgery, cardiothoracic, and more.
              </p>
            </div>

            {/* Image Section */}
            <div className="w-[48%]">
              <div className=" relative overflow-hidden rounded-2xl shadow-lg h-[37.5rem] w-full">
                <Image
                  src="/homePage/help.png"
                  alt="Robotic Surgery"
                  //   width={800}
                  //   height={600}
                  fill
                  className="w-full h-auto object-cover rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        {/* who we are */}
        <div className=" h-[26.938rem]  w-full bg-ebg2 items-center  flex">
          <div className="flex flex-row sm:max-[75vw] max-w-[85rem] w-full mx-auto gap-[2.5rem]">
            {/* image */}
            <div className="max-[40%] w-full border   ">
              <div className="h-[19.875rem] max-w-[35.813rem] w-full  relative border ">
                <Image
                  src="/about/image.png"
                  alt="robotic surgeon"
                  fill
                  className="object-cover  rounded-2xl"
                  priority
                />
              </div>
            </div>
            {/* content */}
            <div className="max-w-[60%] w-full text-black pt-[2rem]  flex flex-col ">
              <p className=" font-sans font-normal text-pxl">Who We Are</p>
              <h2 className=" font-playfair text-t2 font-medium  mb-[1rem] -mt-[.25rem]">
                Precision. Innovation. Compassion.
              </h2>
              <p className="font-sans text-pxl font-normal tracking-normal">
                We are a team of surgeons, clinicians, and technology
                specialists united by a single goal: to deliver innovative,
                patient-focused surgical solutions using the most advanced tools
                available. Our experience, ongoing research, and patient-first
                philosophy set us apart as leaders in the robotic surgical
                field.
              </p>
            </div>
          </div>
        </div>
        {/* vision */}
        <div className="h-auto w-full flex items-center justify-center border-2 border-red-500">
          <div className=" sm:max-w-[75vw] max-w-[85vw] w-full  h-[18rem] text-black flex flex- items-center border border-green-500">
            <div className="w-[45%] border border-black">
              <h2 className=" font-playfair text-t2 font-medium tracking-normal">
                Leading with Vision, Serving with Purpose
              </h2>
              <p className="font-sans font-medium text-pxl tracking-[-4%]">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat
              </p>
            </div>
            <div className="w-[55%] border border-black "></div>
          </div>
        </div>
      </div>
    </>
  );
}
