import Image from "next/image";
import Link from "next/link";

type AuthorAvatar = {
  url: string;
};

type Author = {
  id: number;
  name: string;
  email: string;
  avatar: AuthorAvatar;
};

type Category = {
  name: string;
  slug: string;
  url: string;
};

type Post = {
  publishedPosts: {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  categories: Category[];
  published_at: string | null;
  created_at: string;
  author: Author;
  }[]
};

const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default async function LatestBlogs({publishedPosts}: Post) {

  return (
    <>
      {publishedPosts.map((item: any, index: any) => (
        <Link href={`/blogs/${item.slug}`} key={index}>
          <div
            key={index}
            className="bg-white w-auto accordion-shadow rounded-[0.75rem]  overflow-hidden flex flex-col md:flex-row p-[1.5rem] pb-[2rem] space-y-4 md:space-y-0 gap-[1.75rem] sm:gap-[2.75rem]"
          >
            <div className="w-full md:w-[60%] h-[23.25rem] relative overflow-hidden ">
              <Image
                src={item.image ?? "https://placehold.co/600x400?text=No Image"}
                alt={item.name ?? ""}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col w-full md:w-[40%]  ">
              <div>
                <span className="text-dt font-semibold font-inter text-theme ">
                  {item.categories[0].name}
                </span>
                <div className="text-pxl font-semibold  my-[0.875rem] leading-[2rem] text-blog font-inter">
                  {item.name ?? ''}
                </div>
                <p className=" text-cgray  text-pbase sm:w-[85%] font-inter  font-normal leading-[1.5rem] tracking-wide">
                  {item.description ?? ''}
                </p>
              </div>
              <div className="flex items-center mt-[2rem] space-x-2">
                <div className="relative w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden">
                  <Image
                    src={
                      item.author.avatar.url
                        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${item.author.avatar.url}`
                        : 'https://placehold.co/36x36.png'
                    }
                    alt={item.author.name ?? 'auther'}
                    fill
                    objectFit="cover"
                  />
                </div>
                <div>
                  <p className="text-dt font-inter font-medium text-blog leading-[1.25rem]">
                    {item.author.name ?? ''}
                  </p>
                  <p className="text-dt font-normal text-cgray leading-[1.25rem]">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
