import DoctorsClient from "@/components/DoctorsClient";
import { searchDoctors } from "@/lib/searchDoctors";
import DiscoverExpert from "@/components/homepageComponent/discoverExpert";

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

  return (
    <>
      <DoctorsClient initialDoctors={doctors}  initialError={error} />
      <div className="w-full">
       <DiscoverExpert />
      </div>
    </>
  );
}
