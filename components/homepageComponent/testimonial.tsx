import React from "react";
import SlickSlider from "../slider";

type TestimonialItem = {
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
  repeater_fields: TestimonialItem[] | string;
};

type TestimonialItemSectionProps = {
  testimonialsData: BlockData;
};

const Testimonial: React.FC<TestimonialItemSectionProps> = ({
  testimonialsData,
}) => {
  const { heading, sub_heading, repeater_fields } = testimonialsData;

  const testimonials = JSON.parse(repeater_fields as string);
  // console.log("Testimonials", testimonials);

  return (
    <>
      <div className=" bg-white text-black sm:py-[5.5rem] p-[3.5]  ">
        <div className="max-w-[85vw] sm:max-w-[75vw] mx-auto w-full flex flex-col gap-10 items-center justify-center  ">
          {/* heading section */}
          <div>
            <div className=" flex flex-col items-center justify-center">
              <h2 className="text-t2  font-medium mb-2 font-playfair">
                {heading ?? ""}
              </h2>
              <p className="text-black text-pxl tracking-tight">
                {sub_heading ?? ""}
              </p>
            </div>
          </div>
          {/* slider section */}
          <div className="">
            <div className="flex flex-wrap justify-center h-full ">
              <SlickSlider products={testimonials} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
