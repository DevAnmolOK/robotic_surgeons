import SeacrhSection from "@/components/searchSection";
import ExpertByConcern from "@/components/expertByConcern";
import ExploreTopDoctor from "@/components/exploreTopDoctors";
import Breadcrumbs from "@/components/Breadcrumbs";

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

  const [discoverExpert, doctorsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/block/homediscoverexpert`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`)
    ]);

  const blockData = await discoverExpert.json();
  const doctorsData = await doctorsRes.json();

  const expertCard = blockData.block_data || {};

  return (
    <>
      <div className=" w-full h-auto flex flex-col bg-white text-black">
        {/* herosection */}
        <Breadcrumbs title="Find  Doctors" bgImage="/homePage/heroimage.jpg" />
        {/* search */}
        <div className="   md:h-[11.125rem] py-[2.5rem] md:py-0  w-full bg-ebg2 flex items-center justify-center ">
          <div className="  w-full sm:max-w-[70vw] max-w-[85vw] mx-auto mt-[0.75rem]">
            <SeacrhSection />
          </div>
        </div>
        {/* explore top doctors */}
        {doctorsData.data.length > 0 && <ExploreTopDoctor doctors={doctorsData.data} /> }
        {/* discover expert */}
        <div className="w-full">
          {expertCard && (
            <ExpertByConcern expertsData={expertCard} />
          )}
        </div>
      </div>
    </>
  );
}
