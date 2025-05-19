import Image from "next/image";

export default function ReadStory() {
  return (
    <section className="bg-ebg3    text-black  ">
      <div className="max-w-[85vw] sm:max-w-[75vw]   mx-auto flex flex-col lg:flex-row  gap-10 lg:gap-0 py-12 lg:py-0  ">
        {/* Image */}
        <div className="relative lg:w-1/2 h-story ">
          <Image
            src="/doctorba.png"
            alt="Doctor"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Text Content */}
        <div className=" lg:w-1/2    flex flex-col items-center lg:items-start  justify-center   p-5">
          <p className="text-sm font-semibold text-black">Paul E. Knudson</p>
          <p className="text-sm mb-4">
            Best Robotic Surgeon's Co-Founder and CEO
          </p>

          <p className="  leading-10 text-t2 font-normal  mb-6  ">
            "Managing my mother&apos;s recovery at <br /> home was the
            inspiration for
            <br />
            Best Robotic Surgeon"
          </p>

          <p className=" text-plg mb-6    ">
            Learn about the first-hand experience Paul E. Knudson had with home-{" "}
            <br />
            based care, and how it compelled him to found Best Robotic Surgeon.
          </p>

          <button className="bg-black w-fit text-white px-xl py-2.5 rounded-full text-pxl hover:opacity-90 transition">
            Read story
          </button>
        </div>
      </div>
    </section>
  );
}
