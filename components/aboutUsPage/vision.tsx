const missionVisionData = [
  {
    title: "Our Mission",
    description:
      "To redefine surgical care through innovation, ensuring patients experience the highest standards of safety, comfort, and healing.",
  },
  {
    title: "Our Vision",
    description:
      "To be a global leader in robotic-assisted healthcare by continuously evolving with the latest technology and putting patient outcomes first.",
  },
];
export default function Vision() {
  return (
    <>
      <div className="h-auto w-full flex items-center justify-center  py-[5rem] ">
        <div className=" sm:max-w-[75vw] max-w-[85vw] w-full  lg:h-[18rem] text-black flex flex-col items-center justify-center lg:flex-row gap-[2rem]">
          <div className="lg:w-[45%]  pl-[1rem] pt-[1.5rem]">
            <h2 className=" font-playfair text-t2 font-medium tracking-normal mb-[1rem]">
              Leading with Vision, Serving with Purpose
            </h2>
            <p className="font-sans font-normal text-pxl tracking-tight">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </p>
          </div>
          <div className="lg:w-[55%]  text-white h-full ">
            <div className=" flex flex-row [@media(max-width:400px)]:flex-col gap-[2rem]">
              {missionVisionData.map((data, index) => (
                <div
                  className="h-[18rem] max-w-[22.313rem] w-full flex flex-col items-center justify-center   bg-theme rounded-[1.25rem] sm:p-[3rem] p-[1rem]"
                  key={index}
                >
                  <h2 className=" text-t2 font-playfair font-medium tracking-normal">
                    {data.title}
                  </h2>
                  <p className=" font-sans text-pxl font-light text-center">
                    {data.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
