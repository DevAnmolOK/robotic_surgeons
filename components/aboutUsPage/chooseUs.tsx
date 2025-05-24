import Image from "next/image";
const whyChooseUsFeatures = [
  {
    title: "Smaller incisions, less pain",
    image: "/about/img1.png",
  },
  {
    title: "Shorter hospital stays",
    image: "/about/img2.png",
  },
  {
    title: "Faster Recovery & Reduced Pain",
    image: "/about/img3.png",
  },
  {
    title: "Lower Risk of Infection",
    image: "/about/img4.png",
  },
  {
    title: "Precision Beyond Human Limits",
    image: "/about/img5.png",
  },
];
export default function ChooseUs() {
  return (
    <>
      <div className=" h-auto w-full flex items-center justify-center pb-[6rem] text-black">
        <div className=" sm:max-w-[75vw] max-w-[85vw]  w-full flex flex-col items-center justify-center ">
          <h2 className="text-t2 mb-1 font-playfair font-medium">
            Why Choose us
          </h2>
          <p className=" mb-10 text-pxl  font-sans tracking-tight ">
            Select a specialty to find the right doctor for your needs.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[1.25rem]  justify-items-center ">
            {whyChooseUsFeatures.map((item: any, index: any) => (
              <div key={index} className="flex flex-col items-center">
                <div className="sm:w-[7rem] sm:h-[7rem] h-[6rem] w-[6rem] rounded-full border border-black flex items-center justify-center hover:shadow-lg bg-ebg transition">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={55}
                    height={55}
                    className="object-contain"
                  />
                </div>
                <p className="mt-[1rem] text-plg font-normal font-sans capitalize">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
