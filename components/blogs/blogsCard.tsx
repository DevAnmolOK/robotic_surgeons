import Image from "next/image";
import { ImArrowUpRight2 } from "react-icons/im";
import Link from "next/link";

interface BlogsCardProps {
  blog: {
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
const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
export default function BlogsCard({ blog, index }: BlogsCardProps) {
  return (
    <>
      <Link href={`/blogs/${blog.slug}`}>
        <div
          key={index}
          className="bg-white overflow-hidden rounded-xl custom-shadow sm:p-6  transition p-4"
        >
          <div className="relative  h-bh overflow-hidden mb-4">
            <Image
              src={blog.image ?? "https://placehold.co/600x400?text=No Image"}
              alt={blog.title ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
          <div className=" flex flex-col ">
            <p className="text-dt text-theme font-semibold mb-1">
              {blog.category}
            </p>
            <div className="flex justify-between items-center pt-2 ">
              <p className="font-semibold text-pxl">{blog.title}</p>
              <ImArrowUpRight2 size={16} className="" />
            </div>
            <p className="text-pbase tracking-normal text-cgray py-3 xl:py-4">
              {blog.description}
            </p>
            <div className="flex  items-center gap-2 pb-3">
              <div className="relative w-[2.5rem] h-[2.5rem]">
                <Image
                  src={blog.author.avtar}
                  alt={blog.author.name}
                  fill
                  className={`rounded-full bg-pink1 object-cover  ${
                    index % 2 === 0 ? "bg-pink1" : "bg-red1"
                  }`}
                />
              </div>
              <div className="">
                <p className="text-black text-dt font-medium">
                  {blog.author.name}
                </p>
                <p className="text-cgray text-dt font-normal">
                  {/* {formatDate(blog.created_at)} */}
                  {blog.author.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
