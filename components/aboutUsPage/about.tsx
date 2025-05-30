import Image from "next/image";

type BlockData = {
  heading: string;
  sub_heading?: string | null;
  content: string;
  image: string;
};

type AboutItems = {
  aboutItems: BlockData;
};

export default function About({ aboutItems }: AboutItems) {
  const { heading, sub_heading, image, content } = aboutItems;

  return (
    <>
      <div className="px-6 pb-[3rem] w-full h-auto pt-[6rem] bg-white">
        <div className="sm:max-w-[73vw] max-w-[85vw] lg:h-[37.5rem] mx-auto flex flex-col-reverse lg:flex-row  gap-[2rem] ">
          {/* Text Section */}
          <div className="lg:w-[52%] w-full flex flex-col pl-[1rem] pr-[1.5rem] pt-[2rem]">
            <p className="text-plg text-black mb-[.5rem] font-normal font-sans">
              {sub_heading ?? ""}
            </p>
            <h2 className="text-t2 font-medium text-black leading-tight mb-[1.5rem] font-playfair">
              {heading ?? ""}
              {/* Redefining Surgery Through Precision
              <br className="hidden md:block" /> and Innovation */}
            </h2>
            <p
              className="text-black text-pxl mb-[1rem] font-normal font-sans leading-[2rem]"
              dangerouslySetInnerHTML={{ __html: content ?? "" }}
            />
          </div>

          {/* Image Section */}
          <div className="lg:w-[48%] w-full">
            <div className=" relative overflow-hidden rounded-2xl shadow-lg sm:h-[37.5rem] h-[27rem] w-full">
              <Image
                src={
                  image
                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image}`
                    : "https://placehold.co/600x648.png"
                }
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
