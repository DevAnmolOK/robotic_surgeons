import HeroSection from "@/components/HeroSection";
import ClaimProfileForm from "@/components/claimProfileForm";

const claimsData = [
  {
    title: "Raise your visibility",
    description:
      "Stand out to patients actively seeking care and physicians making informed referrals.",
  },
  {
    title: "Connect with the right patients",
    description:
      "The Robotic Surgeon helps patients find providers with experience in their conditions. Help the right patients find you.",
  },
  {
    title: "Help new patients get in touch",
    description:
      "Without correct information, patients have a hard time reaching out.",
  },
];

export default function ClaimProfile() {
  return (
    <>
      <div className=" w-full h-auto flex flex-col bg-white text-black">
        {/* herosection */}
        <HeroSection pageName="Claim Profile" />
        <div className="md:max-w-[75vw] max-w-[85vw]  w-full mx-auto flex flex-col  ">
          <div className="  flex flex-col item-center justify-center mt-[0.5rem]">
            {claimsData.map((data: any, index: any) => (
              <div
                className=" flex items-center flex-col gap-[0.5rem] justify-center mt-[2rem]"
                key={index}
              >
                <div className=" leading-[2rem] text-[1.625rem] font-semibold font-sans">
                  {data.title}
                </div>
                <div className=" leading-[2rem] font-normal text-pxl">
                  {data.description}
                </div>
              </div>
            ))}
          </div>
          <div className=" flex items-center justify-center pt-[2rem] pb-[3rem] ">
            <ClaimProfileForm />
          </div>
        </div>  
      </div>
    </>
  );
}
