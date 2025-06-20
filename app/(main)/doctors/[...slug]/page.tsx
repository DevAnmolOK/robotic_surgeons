import SeacrhSection from "@/components/searchSection";
import DoctorCard from "@/components/doctorCard";
import { CiSearch } from "react-icons/ci";
import DoctorDetails from "@/components/doctorDetail/DoctorDetail";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import Map from "@/components/Map";
import Link from "next/link";
import { AppointmentForm } from "@/components/AppointmentForm";
import DiscoverExpert from "@/components/homepageComponent/discoverExpert";


type Params = Promise<{ slug: string }>

export default async function DoctorProfile({ params }: { params: Params }) {

  const { slug } = await params;

  const dostorRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${slug}`)
  const dostorJsonRes = await dostorRes.json();

  const doctor = dostorJsonRes.data || {}

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(doctor.address)}&output=embed`;

  const datail = [
    {
      label: "Introduction",
      content: {
        introduction: doctor.description ?? '',
        speciality: doctor.specialty_title ?? '',
        HospitalAffiliations: doctor.hospital_affiliations,
        LanguagesSpoken: doctor.languages_spoken,
        areasOfExpertise: doctor.conditions_treated ?? '',
        education: doctor.educational_background ?? '',
        philosophy:
          '"Surgery is not just about skill — it’s about trust. I believe in combining the latest technology with personalized care to help my patients heal faster and feel safer every step of the way."',
        quoteAuthor: "Dr. James",
      },
    },

    {
      label: "Licence",
      content: "Licence Content",
    },
    {
      label: "Location",
      content: (
        <div className="h-[20rem] w-full">
          <Map mapSrc={mapSrc} />
        </div>
      )
    },
    {
      label: "Clinical Reserch",
      content: doctor.publications_research ?? ''
    },
  ];


 const speciality = doctor?.specialty_title?.toLowerCase() || '';
 const doctorId = doctor?.id || '';

const doctorsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/similar-doctors?speciality=${encodeURIComponent(speciality)}&id=${doctorId}&per_page=3`
);

const doctorsData = await doctorsRes.json();
const similarDoctors = doctorsData?.data?.data || [];


  if (doctor.claim_status !== 'Approve') {
    return (
      <div
        className="flex flex-col justify-center items-center text-center px-4"
        style={{ minHeight: 'calc(100vh - 484px)' }}
      >
        <h2 className="text-t2 mb-3 leading-tight font-playfair">
          This profile is not approved by the admin.
        </h2>
        <Link
          href="/doctors"
          className="bg-theme text-white px-xl py-2.5 rounded-full text-pxl hover:opacity-90 transition">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className=" w-full h-auto flex flex-col bg-white text-black">
        {/* hero section */}
        <Breadcrumbs title="Profile" bgImage="/homePage/heroimage.jpg" />
        {/* search */}
        {/* <div className="   md:h-[11.125rem] py-[2.5rem] md:py-0  w-full bg-ebg2 flex items-center justify-center ">
          <div className="  w-full sm:max-w-[75vw] max-w-[85vw] mx-auto mt-[0.75rem]">
            <SeacrhSection onSearch={handleSearch} />
          </div>
        </div> */}

        {/* Profile Section */}
        <div className="lg:max-w-[73vw] max-w-[85vw] w-full mx-auto flex md:flex-row flex-col gap-[1rem] mt-[3rem] mb-[1.25rem]">
          {/* left */}
          <div className="md:max-w-[68%]  w-full ">
            <div className=" w-full lg:h-[22.188rem] px-[1.25rem] sm:px-[2.25rem] pt-[1rem] accordion-shadow rounded-[1.25rem] mb-[1.5rem]">
              <div className="flex flex-col sm:flex-row  md:items-start items-center md:justify-start justify-center  w-full gap-[2rem]">
                {/* Left: Doctor Image */}
                <div className=" md:h-[12.438rem] sm:h-[16.438rem] h-[20.438rem] md:max-w-[13.188rem] sm:max-w-[16.188rem] max-w-[18.188rem]  w-full relative ">

                  <Image
                    src={
                      doctor.doctor_photo
                        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${doctor.doctor_photo}`
                        : "https://placehold.co/330x330.png"
                    }
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />

                </div>

                {/* Right: Doctor Info */}
                <div className=" flex items-center sm:items-start justify-center sm:justify-between w-full">
                  <div className="flex flex-col sm:w-full  w-fit">
                    <div className="flex items-start justify-between ">
                      <div>
                        <h2 className="text-p3xl font-semibold  font-playfair">
                          {doctor.name ?? ''}
                        </h2>
                        <p className="text-dt font-semibold font-sans">
                          {doctor.specialty_title ?? ''}
                        </p>
                      </div>
                      <div className="sm:flex items-center gap-4 text-[0.938rem] leading-[1.625rem] font-semibold  hidden">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <div className=" h-[0.938rem] w-[0.938rem] relative">
                            <Image
                              src="/icon/Bookmark.png"
                              fill
                              className="object-cover"
                              alt="save doctor"
                              priority
                            />
                          </div>
                          <span>Save</span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <div className=" h-[0.938rem] w-[0.938rem] relative">
                            <Image
                              src="/icon/share.png"
                              fill
                              className="object-cover"
                              alt="save share"
                              priority
                            />
                          </div>
                          <span>Share</span>
                        </div>
                      </div>
                    </div>

                    {doctor.publications_research &&
                      <p className="my-5 text-pbase font-sans leading-[1.625rem] font-normal ">
                        {doctor.publications_research ?? ''}
                      </p>
                    }

                    <div className="text-sm text-gray-700 flex flex-col gap-2.5">
                      <div className="flex items-center gap-1 text-pbase font-normal">
                        <div className=" h-[1.25rem] w-[1.25rem] relative">
                          <Image
                            src="/icon/location.png"
                            fill
                            className="object-contain"
                            alt="save doctor"
                            priority
                          />
                        </div>
                        <span>{doctor.address ?? ''}</span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-pbase">
                        {/* <FaPhoneAlt className="text-blue-500" /> */}
                        <div className=" h-[1.25rem] w-[1.25rem] relative">
                          <Image
                            src="/icon/call.png"
                            fill
                            className="object-contain"
                            alt="save doctor"
                            priority
                          />
                        </div>
                        <Link
                          href={`tel:${doctor.contact_number}`}
                          className="text-theme  hover:underline"
                        >
                          {doctor.contact_number ?? ''}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="flex  w-full  pt-8 pb-[2rem] sm:px-0  items-center sm:items-start justify-center sm:justify-start">
                <div className="flex w-fit px-[1.25rem]">
                  <div className="border-r border-gray-300 w-fit sm:pr-[1rem] pr-[0.5rem]">

                    <span className="text-theme text-[1.375rem] font-bold block leading-[1.375rem]">
                      {doctor.years_of_experience ?? ''}+ Years
                    </span>

                    <span className="font-bold text-pbase leading-[1.375rem]">
                      Experience
                    </span>
                  </div>
                  {/* <div className="border-r border-gray-300 w-fit sm:px-[1rem] px-[0.5rem]">
                    <span className="text-theme text-[1.375rem] font-bold block leading-[1.375rem]">
                      560+
                    </span>
                    <span className="font-bold text-pbase leading-[1.375rem]">
                      Completed Surgery
                    </span>
                  </div> */}
                  {/* <div className=" w-fit sm:pl-[1rem] pl-[0.  5rem]">
                    <span className="text-theme text-[1.375rem] font-bold block leading-[1.375rem]">
                      25k
                    </span>
                    <span className="font-bold text-pbase leading-[1.375rem]">
                      Consultancy
                    </span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* left-2 */}
            <div className=" w-full  accordion-shadow rounded-[1.25rem] mb-[1.5rem]">
              <DoctorDetails detail={datail} />
            </div>
          </div>

          {/* right */}
          <div className="md:max-w-[32%] w-full h-fit   px-[1.5rem] pt-[1rem] pb-[5.5rem] accordion-shadow rounded-[1.25rem] ">
            {datail[0].content.areasOfExpertise &&
              <>
                <h3 className=" text-p3xl font-playfair font-semibold">
                  Areas of Expertise
                </h3>
                <div dangerouslySetInnerHTML={{ __html: datail[0].content.areasOfExpertise }} />
              </>
            }


            <div>
              <p className="mt-[1.5rem] text-pbase leading-[1.625] font-normal mb-[.5rem]">
                Find Dr. Zhang's expertise for a condition
              </p>
              <div className="relative ml-[.25rem]  ">
                <CiSearch className="absolute text-plg left-3 top-1/2 transform -translate-y-1/2 text-black" />
                <input
                  type="text"
                  placeholder="Enter your health condition"
                  className="w-full pl-10 pr-4 py-2 h-[3.063rem] max-w-[22.688rem] rounded-full border border-[#F3F3F3] text-pbase focus:outline-none focus:ring-2 focus:ring-black placeholder:text-[#B2B2B2] placeholder:font-nornal placeholder:text-dt placeholder:tracking-tight"
                />
              </div>
            </div>

            <div className="flex w-full items-center justify-center sm:items-start sm:justify-start ">
              <div className=" flex flex-col ">
                {/* Action 1 */}
                <div className="space-y-2 mt-[2.25rem]">
                  <p className="flex items-center gap-2 ">
                    <Image
                      src="/icon/save.png"
                      height={18}
                      width={18}
                      alt="Save Doctor For later"
                    />
                    <span className="font-semibold text-plg leading-[1.625rem] font-sans">
                      Want to save this doctor for later?
                    </span>
                  </p>
                  <button className="w-fit cursor-pointer  px-[2.5rem] rounded-full bg-black text-white h-[2.813rem]  font-sans  flex items-center justify-center text-pxl font-normal tracking-tight">
                    Sign-up
                  </button>
                </div>
                {/* Action 2 */}
                <div className="space-y-2 mt-[2.15rem]">
                  <p className="flex items-center gap-2 ">
                    {/* <FaBookmark /> */}
                    <Image
                      src="/icon/scope.png"
                      height={22}
                      width={22}
                      alt="Save Doctor For later"
                    />
                    <span className="font-semibold text-plg leading-[1.625rem] font-sans">
                      Is this your doctor?
                    </span>
                  </p>
                  <button className="w-fit cursor-pointer lg:px-[2.5rem] px-[1.5rem] rounded-full bg-black text-white h-[2.813rem]  font-sans  flex items-center justify-center text-pxl font-normal tracking-tight">
                    Find a Second Opinion
                  </button>
                </div>
                {/* Action 3 */}
                <div className="space-y-2 mt-[2.15rem]">
                  <p className="flex items-center gap-2 ">
                    {/* <FaBookmark /> */}
                    <Image
                      src="/icon/doc.png"
                      height={22}
                      width={22}
                      alt="Save Doctor For later"
                    />
                    <span className="font-semibold text-plg leading-[1.625rem] font-sans">
                      Are you the provider on this profile?
                    </span>
                  </p>

                  {(doctor?.claim_status === 'Reject' && doctor?.is_claimed === 'No') && (
                    <Link href="/claim-profile">
                      <button className="w-fit cursor-pointer px-[2.5rem] rounded-full bg-black text-white h-[2.813rem] font-sans flex items-center justify-center text-pxl font-normal tracking-tight">
                        Claim Profile
                      </button>
                    </Link>
                  )}


                  {!doctor?.claim_status && (
                    <Link href="/claim-profile">
                      <button className="w-fit cursor-pointer px-[2.5rem] rounded-full bg-black text-white h-[2.813rem] font-sans flex items-center justify-center text-pxl font-normal tracking-tight">
                        Claim Profile
                      </button>
                    </Link>
                  )}

                  {doctor?.is_claimed === 'Yes' && doctor?.claim_status === 'Not Approved' && (
                    <p className="text-yellow-600 text-sm">Your profile claim request is pending approval.</p>
                  )}


                </div>
              </div>
            </div>
             
            <div className="mt-10">
              <h2 className="text-t2 font-semibold font-playfair leading-[2rem]">
                Appointment Form
              </h2>
              <AppointmentForm doctor_id={doctor.id} specialty={doctor.specialty_title} />  
            </div>
            

          </div>
        </div>

        {/* similar doctor */}
        {similarDoctors.length > 0 &&
          <div className="lg:max-w-[73vw] max-w-[85vw] w-full mx-auto flex gap-[1rem]">
            <div className="lg:max-w-[68%] w-full flex flex-col">
              <h2 className=" text-t2 font-semibold font-playfair leading-[2rem]">
                Similar Doctors:
              </h2>
              <div className="space-y-6 mt-[1.25rem]  mb-[2rem]">
                {similarDoctors.map((doc: any, index: any) => (
                  <div key={index}>
                    <DoctorCard doctor={doc} />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:max-w-[32%] w-full lg:block hidden"></div>
          </div>
        }


        {/* discover expert */}
        <div className="w-full">
          <DiscoverExpert />
        </div>
      </div>
    </>
  );
}
