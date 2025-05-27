import Image from "next/image";
import Link from "next/link";
interface LatestBlogsProps {
  articleCard: {
    category: string;
    title: string;
    description: string;
    author: {
      name: string;
      date: string;
      avtar: string;
    };
    image: string;
    slug: string;
  };
  index: any;
}
export default function LatestBlogs({ articleCard, index }: LatestBlogsProps) {
  return (
    <>
      <Link href={`/blogs/${articleCard.slug}`}>
        <div
          key={index}
          className="bg-white w-auto accordion-shadow rounded-[0.75rem]  overflow-hidden flex flex-col md:flex-row p-[1.5rem] pb-[2rem] space-y-4 md:space-y-0 gap-[1.75rem] sm:gap-[2.75rem]"
        >
          <div className="w-full md:w-[60%] h-[23.25rem] relative overflow-hidden ">
            <Image
              src={articleCard.image}
              alt={articleCard.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col w-full md:w-[40%]  ">
            <div>
              <span className="text-dt font-semibold font-inter text-theme ">
                {articleCard.category}
              </span>
              <div className="text-pxl font-semibold  my-[0.875rem] leading-[2rem] text-blog font-inter">
                {articleCard.title}
              </div>
              <p className=" text-cgray  text-pbase sm:w-[85%] font-inter  font-normal leading-[1.5rem] tracking-wide">
                {articleCard.description}
              </p>
            </div>
            <div className="flex items-center mt-[2rem] space-x-2">
              <div className="relative w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden">
                <Image
                  src={articleCard.author.avtar} // Replace with actual avatar or initials
                  alt={articleCard.author.name}
                  fill
                  objectFit="cover"
                />
              </div>
              <div>
                <p className="text-dt font-inter font-medium text-blog leading-[1.25rem]">
                  {articleCard.author.name}
                </p>
                <p className="text-dt font-normal text-cgray leading-[1.25rem]">
                  {articleCard.author.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
