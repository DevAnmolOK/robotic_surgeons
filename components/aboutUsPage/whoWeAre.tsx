import Image from "next/image";
export default function WeAre() {
  return (
    <>
      <div className=" md:h-[26.938rem]  w-full bg-ebg2 items-center  flex py-[2.5rem] md:py-0">
        <div className="flex md:flex-row flex-col items-center justify-center  sm:max-w-[75vw] max-w-[85vw] w-full mx-auto gap-[2.5rem]">
          {/* image */}
          <div className="md:max-[40%]  w-full border  flex items-center  justify-center md:items-start md:justify-start ">
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
          <div className=" md:max-w-[60%] w-full text-black pt-[2rem]  flex flex-col  ">
            <p className=" font-sans font-normal text-pxl">Who We Are</p>
            <h2 className=" font-playfair text-t2 font-medium  mb-[1rem] -mt-[.25rem] ">
              Precision. Innovation. Compassion.
            </h2>
            <p className="font-sans text-pxl font-normal tracking-normal ">
              We are a team of surgeons, clinicians, and technology specialists
              united by a single goal: to deliver innovative, patient-focused
              surgical solutions using the most advanced tools available. Our
              experience, ongoing research, and patient-first philosophy set us
              apart as leaders in the robotic surgical field.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
