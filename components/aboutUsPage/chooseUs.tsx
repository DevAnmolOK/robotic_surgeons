import Image from "next/image";

export default async function ChooseUs() {

  const featuresRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/block/whychooseus`);
  const featuresData = await featuresRes.json();

  const { heading, sub_heading, repeater_fields } = featuresData.block_data

  const featuresItems = JSON.parse(repeater_fields as string);

  return (
    <>
      <div className=" h-auto w-full flex items-center justify-center pb-[6rem] text-black">
        <div className=" sm:max-w-[75vw] max-w-[85vw]  w-full flex flex-col items-center justify-center ">
          <h2 className="text-t2 mb-1 font-playfair font-medium">
            {heading ?? ''}
          </h2>
          <p className=" mb-10 text-pxl  font-sans tracking-tight ">
            {sub_heading ?? ''}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[1.25rem]  justify-items-center ">
            {featuresItems.map((item: any, index: any) => (
              <div key={index} className="flex flex-col items-center">
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
                <p className="mt-[1rem] text-plg font-normal font-sans capitalize">
                  {item.heading}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
