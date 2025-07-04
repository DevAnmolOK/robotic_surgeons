"use client";

import Image from "next/image";
import Link from "next/link";

export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  insurance?: string;
  rating?: number;
  contact_number?: string;
  clinic_name?: string;
  specialty_title?: string;
  address?: string;
  doctor_photo?: string;
  slug?: string;
  is_featured?: boolean;
  claim_status?: string;
  is_claimed?: boolean;
  // ...add any other required fields
};

export type DoctorCardProps = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: DoctorCardProps) {

  return (
    <>
      <div className="flex sm:flex-row flex-col  sm:items-start items-center sm:justify-start justify-center  border px-[.5rem] py-[0.75rem] border-[#D9D9D9] ">
        {/* image */}
        <div className=" sm:h-[12.375rem] h-[15.375rem] sm:max-w-[12.375rem] max-w-[15.375rem] w-full relative">

          {(doctor?.claim_status === 'Reject' || doctor?.claim_status === 'Not Approved') && (
            <Image
              src="/Surgeon.jpg"
              alt={doctor.name}
              fill
              className="object-cover"
              priority
            />
          )}

          {doctor?.claim_status === 'Approve' &&
            <Image
              src={
                doctor.doctor_photo
                  ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${doctor.doctor_photo}`
                  : "https://placehold.co/330x330.png"
              }
              alt={doctor.name}
              fill
              className="object-cover"
              priority
            />
          }

        </div>
        {/* detail */}
        <div className="px-[1.5rem] py-[0.65rem] flex sm:flex-row flex-col items-start justify-center sm:justify-between w-fit sm:w-full gap-4 sm:gap-0">
          <div className="sm:items-start items-center sm:justify-start justify-center">
            <div className="text-pxl font-bold font-sans capitalize">{doctor.name ?? ''}</div>
            <div className={`${doctor?.claim_status === 'Approve' ? '' : '[filter:blur(5px)]'}`}>
              <p className="font-semibold font-sans text-dt capitalize">{doctor.specialty_title ?? ''}</p>

              {doctor.address &&
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
                    {doctor.address ?? ''}
                  </span>
                </div>
              }

              {doctor.contact_number &&
                <div className="text-theme flex items-center justify-start gap-1.5">
                  <div className="h-[1.238rem] w-[1.238rem] relative">
                    <Image
                      src="/icon/call.png"
                      alt="doctor location"
                      fill
                      className=" text-theme object-cover"
                    />
                  </div>
                  <div className=" font-bold font-sans text-pbase">
                    <Link href={`tel:${doctor.contact_number}`}>{doctor.contact_number ?? ''}</Link>
                  </div>
                </div>
              }
            </div>
          </div>



          {(doctor?.claim_status === 'Reject' || doctor?.claim_status === 'Not Approved') && (
            <Link href="/claim-profile" className="bg-black max-w-[11.75rem] flex items-center justify-center w-full h-[3.125rem] text-white px-6 py-2 rounded-full text-pxl font-normal leading-[1.65rem]" onClick={() => localStorage.setItem('doctorid', doctor.id.toString())}>
              Claim Profile
            </Link>
          )}


          {doctor?.claim_status === 'Approve' &&
            <Link href={doctor.slug ? `/doctors/${doctor.slug}` : '#'} className="bg-black max-w-[11.75rem] flex items-center justify-center w-full h-[3.125rem] text-white px-6 py-2 rounded-full text-pxl font-normal leading-[1.65rem]" onClick={() => localStorage.setItem('doctorid', doctor.id.toString())}>
              View Profile
            </Link>
          }

        </div>
      </div>
    </>
  );
}
