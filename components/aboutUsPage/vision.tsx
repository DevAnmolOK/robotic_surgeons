import React from "react";

export default async function Vision() {

  const purposeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/block/aboutmissionvision`);
  const purposeData = await purposeRes.json();

  const { heading, sub_heading, repeater_fields } = purposeData.block_data

  const purposeItems = JSON.parse(repeater_fields as string);


  return (
    <>
      <div className="h-auto w-full flex items-center justify-center  py-[5rem] ">
        <div className=" sm:max-w-[75vw] max-w-[85vw] w-full  lg:h-[18rem] text-black flex flex-col items-center justify-center lg:flex-row gap-[2rem]">
          <div className="lg:w-[45%]  pl-[1rem] pt-[1.5rem]">
            <h2 className=" font-playfair text-t2 font-medium tracking-normal mb-[1rem]">
              {heading ?? ''}
            </h2>
            <p className="font-sans font-normal text-pxl tracking-tight">
              {sub_heading ?? ''}
            </p>
          </div>
          <div className="lg:w-[55%]  text-white h-full ">
            <div className=" flex flex-row [@media(max-width:400px)]:flex-col gap-[2rem]">
              {purposeItems.map((item: any, index: any) => (
                <div
                  className="h-[18rem] max-w-[22.313rem] w-full flex flex-col items-center justify-center   bg-theme rounded-[1.25rem] sm:p-[3rem] p-[1rem]"
                  key={index}
                >
                  <h2 className=" text-t2 font-playfair font-medium tracking-normal">
                    {item.heading ?? ''}
                  </h2>
                  <p className=" font-sans text-pxl font-light text-center">
                    {item.content ?? ''}
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
