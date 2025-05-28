import Image from "next/image";
import React from "react";
type ExpertsItem = {
  heading: string;
  sub_heading?: string | null;
  image: string;
};

type BlockData = {
  id: number;
  name: string;
  alias: string;
  heading: string;
  sub_heading: string;
  repeater_fields: ExpertsItem[] | string;
};

type DiscoverExpertSectionProps = {
  expertsData: BlockData;
};
const ExpertByConcern: React.FC<DiscoverExpertSectionProps> = ({
  expertsData,
}) => {
  const { heading, sub_heading, repeater_fields } = expertsData;

  const expertData = JSON.parse(repeater_fields as string);
  return (
    <>
      <div className=" text-center bg-white text-black pt-[2rem] pb-axl font-sans ">
        <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto  ">
          <h2 className="text-t2 mb-1 font-playfair font-medium">
            {heading ?? ""}
          </h2>

          <p className=" mb-10 text-pxl  font-sans tracking-tight ">
            {sub_heading ?? ""}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:gap-16 md:gap-4    justify-between ">
            {expertData.map((item: any, index: any) => (
              <div key={index} className="flex flex-col items-center ">
                <div className="sm:w-[7rem] sm:h-[7rem] h-[6rem] w-[6rem] rounded-full border border-black flex items-center justify-center hover:shadow-lg bg-ebg transition">
                  <Image
                    src={
                      item.image
                        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${item.image}`
                        : "https://placehold.co/55x55.png"
                    }
                    alt={item.heading}
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 text-plg font-medium font-sans capitalize">
                  {item.heading}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertByConcern;
