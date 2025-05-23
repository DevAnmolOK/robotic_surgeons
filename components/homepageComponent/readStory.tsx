import Image from "next/image";
import Link from "next/link";

type BlockData = {
  heading: string;
  sub_heading: string;
  description: string,
  cta_text: string | null;
  cta_link: string | null;
  content: string;
  image: string;
}

type ReadStorySectionProps = {
  readStoryData: BlockData;
}

const ReadStory: React.FC<ReadStorySectionProps> = ({ readStoryData }) => {

  const { heading, sub_heading, description, cta_text, cta_link, image, content } = readStoryData

  return (
    <section className="bg-ebg3    text-black  ">
      <div className="max-w-[85vw] sm:max-w-[75vw]   mx-auto flex flex-col lg:flex-row  gap-10 lg:gap-0 py-12 lg:py-0  ">
        {/* Image */}
        <div className="relative lg:w-1/2 lg:h-story h-[20rem]">
          <Image
            src={
              image
                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${image}`
                : 'https://placehold.co/500x500.png'
            }
            alt={heading ?? "Doctor"}
            fill
            className="lg:object-cover object-contain"
            priority
          />
        </div>

        {/* Text Content */}
        <div className=" lg:w-1/2    flex flex-col items-center lg:items-start  justify-center   p-5">
          <p className="text-sm font-semibold text-black">{heading ?? ''}</p>
          <p className="text-sm mb-4">
            {sub_heading ?? ''}
          </p>

          <p className="  leading-10 text-t2 font-normal  mb-6  ">
            "{description ?? ''}"
          </p>

          <p className="text-plg mb-6" dangerouslySetInnerHTML={{ __html: content.replace(/^<p>/, '').replace(/<\/p>$/, '') ?? '' }} />
           
          {/* <p className="  leading-10 text-t2 font-normal  mb-6  ">
            "Managing my mother&apos;s recovery at <br className="lg:show hidden"/> home was the
            inspiration for
            <br className="lg:show hidden"/>
            Best Robotic Surgeon"
          </p>

          <p className=" text-plg mb-6    ">
            Learn about the first-hand experience Paul E. Knudson had with home-{" "}
            <br className=" lg:show hidden"/>
            based care, and how it compelled him to found Best Robotic Surgeon.
          </p> */}

          {cta_text &&
            <Link href={cta_link ?? '#'}>
              <button className="bg-black w-fit text-white px-xl py-2.5 rounded-full text-pxl hover:opacity-90 transition cursor-pointer">
                {cta_text ?? ''}
              </button>
            </Link>
          }

        </div>
      </div>
    </section>
  );
}

export default ReadStory