interface MembershipCardProps {
  plan: any;
  index: any;
}
export default function MembershipCard({ plan, index }: MembershipCardProps) {
  return (
    <>
      <div
        key={index}
        // className={`flex h-[29.5rem]  max-w-[23rem] w-full hover:h-[32.813rem] hover:max-w-[23] border border-[#E3E3E3] hover:bg-theme hover:text-white text-black  flex-col justify-between p-[2.25rem] rounded-[2.375rem]  `}
        className={`group flex md:h-[29.5rem] max-h-[34.5rem] md:max-w-[23rem] max-w-[28rem] w-full hover:h-[32.813rem] hover:max-w-[23rem] border border-[#E3E3E3] hover:bg-theme hover:text-white text-black flex-col p-[2.25rem] rounded-[2.375rem] transition-all duration-200`}
      >
        <div>
          <h2 className=" font-semibold text-p3xl mb-[0.5rem] font-playfair leading-[2rem]">
            {plan.title}
          </h2>
          <p className="mb-[1.5rem] font-normal text-pbase leading-[1.625rem] font-sans">
            {plan.description}
          </p>
          <button
            className={`  py-2 px-5 leading-[1.625rem] rounded-full h-[2.813rem] w-fit font-normal text-pxl bg-black text-white group-hover:bg-white group-hover:text-black transition-all duration-300`}
          >
            {plan.buttonText}
          </button>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-pbase leading-[1.625rem] font-sans">
            What Included
          </h3>
          <ul className="space-y-2 list-disc list-inside text-plg font-normal leading-[2rem] pb-[1rem]">
            {plan.features.map((feature: any, i: any) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
