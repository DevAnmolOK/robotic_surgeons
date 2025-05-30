import Image from "next/image";
import { ImArrowUpRight2 } from "react-icons/im";
import { formatDate } from "@/lib/api";

interface BlogsCardProps {
  blog: any;
  index: any;
}

export default function BlogCard({ blog, index }: BlogsCardProps) {
  return (
    <>
      <div
        key={index}
        className="bg-white overflow-hidden rounded-xl custom-shadow sm:p-6  transition p-4"
      >
        <div className="relative  h-bh overflow-hidden mb-4">
          <Image
            src={blog.image ?? "https://placehold.co/600x400?text=No Image"}
            alt={blog.name ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
        <div className=" flex flex-col ">
          <p className="text-dt text-theme font-semibold mb-1">
            {blog.categories[0].name}
          </p>
          <div className="flex justify-between items-center pt-2 ">
            <p className="font-semibold text-pxl">{blog.name}</p>
            <ImArrowUpRight2 size={16} className="" />
          </div>
          <p className="text-pbase tracking-normal text-cgray py-3 xl:py-4">
            {blog.description}
          </p>
          <div className="flex items-center gap-2 pb-3">
            <Image
              src={
                blog.author.avatar.url
                  ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${blog.author.avatar.url}`
                  : 'https://placehold.co/36x36.png'
              }
              alt={blog.name}
              width={36}
              height={36}
              // className="rounded-full bg-pink1 object-cover"
              className={`rounded-full bg-pink1 object-cover  ${index < 2 ? "bg-pink1" : "bg-red1"
                }`}
            />
            <div className="">
              <p className="text-black text-dt font-medium">
                {blog.author.name ?? ''}
              </p>
              <p className="text-cgray text-dt font-normal">
                {formatDate(blog.created_at)}
                {/* {blog.author.date} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
