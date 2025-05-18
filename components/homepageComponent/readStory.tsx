import Image from "next/image";

export default function ReadStory() {
  return (
    <section className="bg-ebg3   text-black">
      <div className="max-w-[85vw] sm:max-w-[75vw] mx-auto flex flex-col lg:flex-row ">
        {/* Image */}
        {/* <div className="relative w-full lg:w-1/2 h-[200px] sm:h-[500px] lg:h-[700px]"> */}
        <div className="relative w-1/2  h-story  -bottom-18  ">
          <Image
            src="/doctora.png"
            alt="Doctor"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Text Content */}
        <div className=" lg:w-1/2  border border-black  flex flex-col item-center justify-center">
          <p className="text-sm font-semibold text-black">Paul E. Knudson</p>
          <p className="text-sm mb-4">
            Best Robotic Surgeon's Co-Founder and CEO
          </p>

          <p className="text-2xl sm:text-3xl lg:pr-28 xl:text-t2 font-normal  mb-6  ">
            "Managing my mother&apos;s recovery at home was the inspiration for
            Best Robotic Surgeon"
          </p>

          <p className=" text-base 2xl:text-lg mb-6 xl:pr-5   ">
            Learn about the first-hand experience Paul E. Knudson had with
            home-based care, and how it compelled him to found Best Robotic
            Surgeon.
          </p>

          <button className="bg-black w-fit text-white sm:px-6 px-2 2xl:px-14 py-2.5 rounded-full text-sm xl:text-lg hover:opacity-90 transition">
            Read story
          </button>
        </div>
      </div>
    </section>
  );
}
