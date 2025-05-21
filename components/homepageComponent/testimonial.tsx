import React from "react";
import SlickSlider from "../slider";
import TestimonialCard from "../testimonailCard";


type TestimonialItem = {
  heading: string;
  sub_heading?: string | null;
  image: string;
}

type BlockData = {
  id: number;
  name: string;
  alias: string;
  heading: string;
  sub_heading: string;
  repeater_fields: TestimonialItem[] | string;
}

type TestimonialItemSectionProps = {
  testimonialsData: BlockData;
}

// export const testimonials = [
//   {
//     id: 1,
//     name: "Jonathan Sweeney",
//     avatar: "/homePage/t1.png",
//     quote:
//       "I am so happy with your company.Ever since my insurer switched to you,everything and everybody I've spokento has been extremely, extremely pleasant, helpful, and they listen to my concerns instead of just saying okay!",
//   },
//   {
//     id: 2,
//     name: "Barbara Cook",
//     avatar: "/homePage/t2.png",
//     quote:
//       "I am so happy with your company. Ever since my insurer switched to you, everyone I've spoken to has been extremely pleasant and helpful.",
//   },
//   {
//     id: 3,
//     name: "Mary Rogers",
//     avatar: "/homePage/t3.png",
//     quote:
//       "I just want to thank you for the great job you did during my transition to oxygen. You unraveled all the confusion and the new company is wonderful.",
//   },
//   {
//     id: 4,
//     name: "Steven Clark",
//     avatar: "/homePage/t1.png",
//     quote:
//       "Your service is top-notch. I feel truly supported and appreciated as a customer.",
//   },
//   {
//     id: 5,
//     name: "Patricia Hall",
//     avatar: "/homePage/t2.png",
//     quote:
//       "I'm impressed by how easy everything was. Great communication and care!",
//   },
//   {
//     id: 6,
//     name: "Angela Price",
//     avatar: "/homePage/t3.png",
//     quote:
//       "Every time I had a question, someone was there to help. Thank you for making things easy.",
//   },
//   {
//     id: 7,
//     name: "Thomas Lee",
//     avatar: "/homePage/t1.png",
//     quote:
//       "Efficient and professional. Couldn't ask for more from a company like this.",
//   },
//   {
//     id: 8,
//     name: "Diana Moore",
//     avatar: "/homePage/t2.png",
//     quote:
//       "The transition was seamless. I’m very pleased with the support team.",
//   },
//   {
//     id: 9,
//     name: "Robert Young",
//     avatar: "/homePage/t3.png",
//     quote:
//       "The representative I worked with was so helpful. They really listened to my concerns.",
//   },
//   {
//     id: 10,
//     name: "Emily Adams",
//     avatar: "/homePage/t1.png",
//     quote:
//       "Such a caring company! You’ve made a stressful process much smoother.",
//   },
// ];

const Testimonial: React.FC<TestimonialItemSectionProps> = ({testimonialsData}) => {

  const { heading, sub_heading, repeater_fields } = testimonialsData

  const testimonials = JSON.parse(repeater_fields as string);

  return (
    <>
      <div className=" bg-white text-black py-pbn ">
        <div className="max-w-[85vw] sm:max-w-[75vw] mx-auto w-full flex flex-col gap-10 items-center justify-center  ">
          {/* heading section */}
          <div>
            <div className=" flex flex-col items-center justify-center">
              <h2 className="text-t2  font-medium mb-2 font-playfair">
                {heading ?? ''}
              </h2>
              <p className="text-black text-pxl    ">
                {sub_heading ?? ''}
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
}

export default Testimonial