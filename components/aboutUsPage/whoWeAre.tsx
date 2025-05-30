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

export default function WeAre({ aboutItems }: AboutItems) {
  const { heading, sub_heading, image, content } = aboutItems;

  return (
    <>
      <div className=" md:h-[26.938rem]  w-full bg-ebg2 items-center  flex py-[2.5rem] md:py-0">
        <div className="flex md:flex-row flex-col   sm:max-w-[75vw] max-w-[85vw] w-full mx-auto gap-[1.5rem]">
          {/* image */}
          <div className="md:max-[40%] w-full flex items-center justify-center md:items-start md:justify-start  pl-[3rem]">
            <div className="h-[19.875rem] max-w-[35.813rem] w-full relative ">
              <Image
                src={
                  image
                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image}`
                    : "https://placehold.co/318x537.png"
                }
                alt="robotic surgeon"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
          {/* content */}
          <div className=" md:max-w-[60%] w-full text-black pt-[2rem]  flex flex-col">
            <p className=" font-sans font-normal text-pxl">
              {sub_heading ?? ""}
            </p>
            <h2 className=" font-playfair text-t2 font-medium  mb-[1rem] -mt-[.25rem] ">
              {heading ?? ""}
            </h2>
            <p
              className="font-sans text-pxl font-normal tracking-normal"
              dangerouslySetInnerHTML={{ __html: content ?? "" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
