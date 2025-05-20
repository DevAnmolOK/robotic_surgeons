import Image from "next/image";
import { IoCheckmarkSharp } from "react-icons/io5";
import Link from "next/link";

type BlockData = {
  heading: string;
  sub_heading: string;
  description: string,
  cta_text: string | null;
  cta_link: string | null;
  content: string;
  raw_content: string,
  image: string;
}

type InstantAppointmentSectionProps = {
  InstantAppointmentData: BlockData;
}

const points = [
  "24x7 Service",
  "Leading Robotic Surgeons",
  "Verified and Informative Doctor Profiles",
];

const RobotAppointment: React.FC<InstantAppointmentSectionProps> = ({ InstantAppointmentData }) => {

  const { heading, description, image, cta_text, cta_link } = InstantAppointmentData

  return (
    <section className="bg-ebg2 py-16 text-black font-sans">
      <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto px-4 flex flex-col-reverse item-center justify-center lg:flex-row items-stretch gap-5 lg:gap-5     h-full">
        {/* Left Content */}
        <div className="w-full lg:w-[35%] h-full gap-2 flex flex-col justify-center ">
          {/* <h2 className="text-2xl md:text-t2 mb-6 leading-tight font-playfair"> */}
          <h2 className="text-t2 mb-3 leading-tight font-playfair" dangerouslySetInnerHTML={{ __html: heading ?? '' }} />
          <p className=" mb-3 text-pbase leading-relaxed">
            {description ?? ''}
          </p>

          {/* Bullet Points */}
          <ul className="space-y-5 mb-3">
            {points.map((point, index) => (
              <li
                key={index}
                className="flex items-center text-black text-pbase"
              >
                <div className=" h-6  w-6 border flex items-center justify-center bg-bgGreen text-white mr-3 rounded-md">
                  <IoCheckmarkSharp className="" size={18} />
                </div>
                {point}
              </li>
            ))}
          </ul>

          {/* <div dangerouslySetInnerHTML={{ __html: raw_content ?? '' }} />

<div dangerouslySetInnerHTML={{ __html: content ?? '' }} /> */}

          {cta_text &&
            <Link href={cta_link ?? '#'}>
              <button className="bg-black w-fit text-pxl text-white px-3 sm:px-6 xl:px-8 sm:py-2 py-1 mt-3 rounded-full  font-[400]  hover:shadow-lg transition cursor-pointer">
                {cta_text ?? ''}
              </button>
            </Link>
          }

        </div>

        {/* Right Image */}
        <div className=" relative w-full  lg:h-[26.125rem] h-[10rem]  lg:max-w-[65%] flex items-center justify-center">
          <Image
            src={
              image
                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image}`
                : 'https://placehold.co/500x500.png'
            }
            alt={heading ?? "Robotic Surgery Setup"}
            fill
            className="object-contain object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default RobotAppointment