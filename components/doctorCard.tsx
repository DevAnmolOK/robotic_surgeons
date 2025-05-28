import Image from "next/image";
interface DoctorCardProps {
  doc: any;
}
export default function DoctorCard({ doc }: DoctorCardProps) {
  return (
    <>
      <div className="flex sm:flex-row flex-col  sm:items-start items-center sm:justify-start justify-center  border px-[.5rem] py-[0.75rem] border-[#D9D9D9] ">
        {/* image */}
        <div className=" sm:h-[12.375rem] h-[15.375rem] sm:max-w-[12.375rem] max-w-[15.375rem] w-full  relative ">
          <Image
            src={doc.image}
            alt={doc.name}
            fill
            className=" object-cover"
            priority
          />
        </div>
        {/* detail */}
        <div className="px-[1.5rem] py-[0.65rem] flex sm:flex-row flex-col items-start justify-center sm:justify-between w-fit sm:w-full gap-4 sm:gap-0  ">
          <div className="sm:items-start items-center sm:justify-start justify-center  ">
            <div className="text-pxl font-bold font-sans">{doc.name}</div>
            <p className="font-semibold font-sans text-dt">{doc.designation}</p>
            <div className="mt-1 mb-[0.5rem]  flex justify-center items-center gap-1.5 text-wrap">
              <div className="h-[1.125rem] w-[0.938rem]  relative">
                <Image
                  src="/icon/location.png"
                  alt="doctor location"
                  fill
                  className=" text-theme object-contain"
                />
              </div>
              <span className=" font-sans  text-pbase font-normal">
                {doc.location}
              </span>
            </div>
            <div className="text-theme flex items-center justify-start gap-1.5">
              <div className="h-[1.238rem] w-[1.238rem] relative">
                <Image
                  src="/icon/call.png"
                  alt="doctor location"
                  fill
                  className=" text-theme object-cover"
                />
              </div>
              <div className=" font-bold font-sans text-pbase">{doc.phone}</div>
            </div>
          </div>
          <div className="bg-black max-w-[11.75rem] flex items-center justify-center w-full h-[3.125rem] text-white px-6 py-2 rounded-full text-pxl font-normal leading-[1.65rem]">
            View Profile
          </div>
        </div>
      </div>
    </>
  );
}
