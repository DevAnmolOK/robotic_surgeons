import MembershipCard from "@/components/membership/membershipCard";
const pricingPlans = [
  {
    title: "Free Plan",
    description:
      "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,",
    buttonText: "Get Started",
    features: [
      "Basic Features",
      "Basic Integrations",
      "Limited Service",
      "Chat Support",
    ],
    featured: false,
  },
  {
    title: "6 Month Plan",
    description:
      "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,",
    buttonText: "Get Started",
    features: [
      "Basic Features",
      "Basic Integrations",
      "Limited Service",
      "Chat Support",
    ],
    featured: false,
  },
  {
    title: "I Year Plan",
    description:
      "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,",
    buttonText: "Get Started",
    features: [
      "Basic Features",
      "Basic Integrations",
      "Limited Service",
      "Chat Support",
    ],
    featured: true,
  },
];

export default function Membership() {
  return (
    <>
      <div className=" flex flex-col h-auto w-full bg-white text-black">
        {/* herosection */}
        <div
          className="relative sm:h-[14.5rem] h-[10rem]  w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/homePage/heroimage.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center font-playfair">
            <h1 className="text-white text-p3xl font-bold">Membership</h1>
          </div>
        </div>
        <div className="sm:max-w-[75vw] max-w-[85vw] flex flex-col w-full mx-auto">
          {/* Become a member */}
          <div className=" flex flex-col items-center justify-center text-black mt-[3.25rem] ">
            <h2 className="text-t2 font-playfair font-semibold leading-[2rem] text-center">
              Become a Member of the Robotic Surgeon
            </h2>
            <p className="leading-[2rem] text-pxl font-normal font-sans pt-[0.75rem] text-center">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s,
            </p>
            <div className=" w-full flex md:flex-row flex-col gap-4 md:gap-0 items-center justify-center my-[5rem] ">
              {pricingPlans.map((plan, index) => (
                <div className="" key={index}>
                  <MembershipCard plan={plan} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
