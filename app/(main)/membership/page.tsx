import MembershipCard from "@/components/membership/membershipCard";
import Testimonial from "@/components/homepageComponent/testimonial";
import Breadcrumbs from "@/components/Breadcrumbs";

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

export default async function Membership() {
  
  const [testimonialData, pricingPlans] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/block/hometestimonial`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan-list`),
    ]);

  const blockData = await testimonialData.json();
  const testimonial = blockData.block_data || {};

  const pricingPlansCards = await pricingPlans.json();
  const pricingPlansCard = await pricingPlansCards.data.data || {};
  

  return (
    <>
      <div className=" flex flex-col h-auto w-full bg-white text-black">
        {/* herosection */}
        <Breadcrumbs title="Membership" bgImage="/homePage/heroimage.jpg" />

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
            <div className=" w-full flex md:flex-row flex-col gap-4 md:gap-0 items-center justify-center sm:mt-[5rem] mt-[3rem] ">
              {pricingPlansCard.map((plan: any, index: any) => (
                <div className="" key={index}>
                  <MembershipCard heading={plan.heading} id={plan.id} price={plan.price} short_description={plan.short_description} description={plan.description} month_duration={plan.month_duration} />
                </div>
              ))}
            </div>
          </div>
          {/* testimonials */}
          <div className="">
            {testimonial && <Testimonial testimonialsData={testimonial} />}
          </div>
        </div>
      </div>
    </>
  );
}
