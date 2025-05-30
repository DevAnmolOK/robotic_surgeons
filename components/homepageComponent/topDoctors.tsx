import Image from "next/image";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import Link from "next/link";

const TopDoctors = async () => {

  const doctorsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/doctors`
  );
  const doctorsData = await doctorsRes.json();

  const featuredDoctor = doctorsData.data.filter(
    (doctor: any) => doctor.is_featured == 1
   );

  return (
    <>
      {featuredDoctor.length > 0 && (
        <section className="  px-4 pt-2xl bg-white text-black font-sans">
          <div className="max-w-[85vw] sm:max-w-[75vw] mx-auto  ">
            {/* Header */}
            <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
              <h2 className="text-t2  font-medium mb-2 font-playfair">
                Top Doctors
              </h2>

              <p className="text-black text-xl    ">
                Highly recommended doctors, ready to help you feel better.
              </p>

              <Link href="/doctors" className="bg-black w-fit text-white px-xl py-2.5 rounded-full text-pxl hover:opacity-90 transition">
                  View All
              </Link>
            </div>
            {/* Doctor Grid */}
            <div className="lg:grid  lg:grid-cols-4 flex flex-wrap items-center justify-center lg:gap-6 gap-10">
              {/* <div className="flex flex-wrap items-center justify-center gap-6"> */}
              {featuredDoctor.map((doctor: any, index: any) => (
                <div key={index} className="bg-white overflow-hidden ">
                  <div className=" h-dh w-dw relative">
                    <Link href={doctor.slug ? `/doctors/${doctor.slug}` : '#'}>
                      <Image
                        src={
                          doctor.doctor_photo
                            ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${doctor.doctor_photo}`
                            : "https://placehold.co/330x330.png"
                        }
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </Link>
                  </div>
                  <div className="p-4">
                    
                      <p className="text-pxl font-bold">Dr. {doctor.name ?? ''}</p>
                    
                    <p className="text-dt font-semibold mb-2 capitalize">
                      {doctor.specialty_title ?? ''}
                    </p>
                    <div className="flex items-start gap-0.5 text-pbase    text-gray-700 mb-1">
                      <SlLocationPin className="mt-1 text-theme" size={14} />
                      {doctor.address ?? ''}
                    </div>
                    <div className="flex items-center gap-2 text-pbase text-theme font-semibold">
                      <BsTelephone size={14} />
                      {doctor.contact_number ?? ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TopDoctors;
