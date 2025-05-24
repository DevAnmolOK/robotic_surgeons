import Image from "next/image";
export default function About() {
  return (
    <>
      <div className="px-6 pb-[3rem] w-full h-auto pt-[6rem] bg-white">
        <div className="sm:max-w-[73vw] max-w-[85vw] lg:h-[37.5rem] mx-auto flex flex-col-reverse lg:flex-row  gap-[3rem] ">
          {/* Text Section */}
          <div className="lg:w-[52%] w-full flex flex-col pl-[1rem] pr-[2rem] pt-[2rem] ">
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
              is committed to transforming surgical outcomes through the use of
              advanced robotic systems that enhance dexterity, accuracy, and
              control. With the help of state-of-the-art equipment like the da
              Vinci Surgical System and other robotic platforms, we perform a
              wide range of procedures in urology, gynecology, general surgery,
              cardiothoracic, and more.
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-[48%] w-full">
            <div className=" relative overflow-hidden rounded-2xl shadow-lg sm:h-[37.5rem] h-[27rem] w-full">
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
    </>
  );
}
