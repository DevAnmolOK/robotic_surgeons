import Image from "next/image";

export default function ReadStory() {
  return (
    <section className="bg-ebg3  px-4 text-black">
      <div className="max-w-[85vw] sm:max-w-[75vw] mx-auto flex flex-col lg:flex-row items-center">
        {/* Image */}
        <div className="relative w-full lg:w-1/2 h-[200px] sm:h-[500px] lg:h-[700px]">
          <Image
            src="/doctora.png"
            alt="Doctor"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 70vw"
            priority
          />
        </div>

        {/* Text Content */}
        <div className=" lg:w-1/2 lg:pr-20     flex flex-col item-center justify-center">
          <p className="text-sm font-semibold text-black">Paul E. Knudson</p>
          <p className="text-sm mb-4">
            Best Robotic Surgeon's Co-Founder and CEO
          </p>

          <p className="text-2xl sm:text-3xl xl:text-t2 font-normal  mb-6 2xl:pr-28 ">
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
