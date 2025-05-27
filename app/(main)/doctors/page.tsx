import HeroSection from "@/components/HeroSection";
import SeacrhSection from "@/components/searchSection";
import ExpertByConcern from "@/components/expertByConcern";

import ExploreTopDoctor from "@/components/exploreTopDoctors";

const doctors = [
  {
    name: "Dr. James Whitman",
    designation: "Founder of Cardiac Hospital",
    location: "1601 Avocado Ave, Newport Beach, CA",
    phone: "+1 123-456-7890",
    image: "/doctor/d1.png",
  },
  {
    name: "Dr. Emily Carter",
    designation: "Chief Neurologist",
    location: "250 Palm Street, San Diego, CA",
    phone: "+1 987-654-3210",
    image: "/doctor/d2.png",
  },
  {
    name: "Dr. Liam Johnson",
    designation: "Orthopedic Specialist",
    location: "789 Coastal Rd, Santa Monica, CA",
    phone: "+1 456-789-1234",
    image: "/doctor/d3.png",
  },
  {
    name: "Dr. Sophia Patel",
    designation: "Pediatric Surgeon",
    location: "412 Ocean View Blvd, Malibu, CA",
    phone: "+1 321-654-0987",
    image: "/doctor/d1.png",
  },
];
const filters = [
  {
    label: "Distance",
    options: ["< 5 miles", "< 10 miles", "< 20 miles", "Any"],
  },
  {
    label: "Specialty",
    options: ["Cardiology", "Neurology", "Pediatrics", "Orthopedics"],
  },
  {
    label: "Insurance",
    options: ["Aetna", "Blue Cross", "Cigna", "UnitedHealthcare"],
  },
  {
    label: "Rating",
    options: ["4.0+ stars", "4.5+ stars", "5 stars"],
    isStar: true,
  },
];

export default async function Doctors() {
  const homepageData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blocks`);
  const blockData = await homepageData.json();

  const data = blockData.data || {};

  return (
    <>
      <div className=" w-full h-auto flex flex-col bg-white text-black">
        {/* herosection */}
        <HeroSection pageName="Find  Doctors" />
        {/* search */}
        <div className="   md:h-[11.125rem] py-[2.5rem] md:py-0  w-full bg-ebg2 flex items-center justify-center ">
          <div className="  w-full sm:max-w-[70vw] max-w-[85vw] mx-auto mt-[0.75rem]">
            <SeacrhSection />
          </div>
        </div>
        {/* explore top doctors */}
        <ExploreTopDoctor />
        {/* discover expert */}
        <div className="w-full">
          {data.homediscoverexpert && (
            <ExpertByConcern expertsData={data.homediscoverexpert} />
          )}
        </div>
      </div>
    </>
  );
}
