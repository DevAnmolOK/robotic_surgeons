import Image from "next/image";
import Link from "next/link";

type BlockData = {
  heading: string;
  sub_heading: string;
  cta_text: string | null;
  cta_link: string | null;
  content: string;
  image: string;
};

type HelpToFindSectionProps = {
  helpToFindData: BlockData;
};

const HelpToFind: React.FC<HelpToFindSectionProps> = ({ helpToFindData }) => {
  const { heading, content, cta_text, cta_link, image } = helpToFindData;

  return (
    <section className="px-4 sm:py-5 sm:pb-20 p-5  bg-white ">
      <div className="max-w-[85vw] sm:max-w-[75vw] w-full mx-auto flex flex-col-reverse gap-5 lg:gap-0    lg:flex-row items-center">
        {/* Left Text Card */}
        <div className="bg-theme text-white sm:p-12  p-4  rounded-2xl w-full lg:w-3/5 lg:pr-28 shadow-md lg:-mr-10  z-20">
          <h2 className="text-t2 font-medium mb-4 leading-snug font-playfair">
            {heading ?? ""}
          </h2>

          <div
            className="mb-4 text-pxl font-sans font-light 2xl:leading-8 leading-7 tracking-normal"
            dangerouslySetInnerHTML={{ __html: content ?? "" }}
          />

          {cta_text && (
            <Link href={cta_link ?? "#"}>
              <button className="bg-white capitalize text-black font-medium px-2 lg:px-6 2xl:px-10 py-1 lg:py-2 text-pxl xl:mt-4 rounded-full shadow hover:shadow-lg transition cursor-pointer">
                {cta_text ?? ""}
              </button>
            </Link>
          )}
        </div>

        {/* Right Image Card */}
        <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-md h-full">
          <Image
            src={
              image
                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image}`
                : "https://placehold.co/500x500.png"
            }
            alt={heading ?? "Robotic Surgery"}
            className="object-cover w-full h-full rounded-2xl"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HelpToFind;
