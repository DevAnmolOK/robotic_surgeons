import DoctorsClient from "@/components/DoctorsClient";
import { searchDoctors } from "@/lib/searchDoctors";
import ExpertByConcern from "@/components/expertByConcern";

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string>>;

export default async function DoctorsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  let doctors = [];
  let error = "";
  
  try {
    doctors = await searchDoctors({
      searchTerm: searchParams?.search || "",
      location: searchParams?.location || "",
      procedure: searchParams?.specialty || "",
    });
  } catch (err: any) {
    error = err.message || "Something went wrong while fetching doctors.";
  }

  const discoverExpert = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/block/homediscoverexpert`,
    { cache: "no-store" } // prevent caching
  );
  const blockData = await discoverExpert.json();
  const expertCard = blockData.block_data || {};
  
  return (
    <>
      <DoctorsClient initialDoctors={doctors}  initialError={error} />
      <div className="w-full">
        {expertCard && <ExpertByConcern expertsData={expertCard} />}
      </div>
    </>
  );
}
