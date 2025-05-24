import Image from "next/image";
import { ImArrowUpRight2 } from "react-icons/im";

type Category = {
  id: number;
  name: string;
  slug: string;
  url: string;
  description: string;
};

type SeoMeta = {
  seo_title: string | null;
  seo_description: string | null;
  seo_index: string | null;
};

type NewsItem = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  categories: Category[];
  seo_meta: SeoMeta;
};

type latestBlogsType = {
  latestBlogs: {
    data: NewsItem[];
  };
};

const blogs = [
  {
    category: "Allergy",
    title: "Allergy and Immunology",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Olivia Rhye",
      date: "20 Jan 2022",
      avatar: "/blog/author2.png",
    },
    image: "/blog/b1.png", // place in /public/homePage/blogs/
  },
  {
    category: "Allergy",
    title: "Allergy and Immunology",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Olivia Rhye",
      date: "20 Jan 2022",
      avatar: "/blog/author2.png",
    },
    image: "/blog/b2.png",
  },
  {
    category: "Medicine",
    title: "Family Medicine",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Lana Steiner",
      date: "18 Jan 2022",
      avatar: "/blog/author1.png",
    },
    image: "/blog/b3.png",
  },
  {
    category: "Oculoplastic",
    title: "Oculoplastic Surgery",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Lana Steiner",
      date: "18 Jan 2022",
      avatar: "/blog/author1.png",
    },
    image: "/blog/b4.png",
  },
];

const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const BlogSection: React.FC<latestBlogsType> = ({ latestBlogs }) => {
  // console.log(latestBlogs.data[0].categories[0].name)

  return (
    <section className="bg-white text-black py-pbn px-4 font-sans ">
      <div className=" max-w-[85vw] sm:max-w-[75vw] w-full mx-auto">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-t2  font-medium mb-2  font-playfair">
              Our Latest News and Blogs
            </h2>
            <p className="text-pxl    ">
              Highly recommended doctors, ready to help you feel better.
            </p>
          </div>
          <button className="bg-black w-fit text-white px-xl py-2.5 rounded-full text-pxl hover:opacity-90 transition ">
            Explore More
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
          {latestBlogs.data.map((blog: any, index: any) => (
            <div
              key={index}
              className="bg-white overflow-hidden rounded-xl custom-shadow sm:p-6  transition p-4"
            >
              <div className="relative  h-bh overflow-hidden mb-4">
                <Image
                  src={
                    blog.image ?? "https://placehold.co/600x400?text=No Image"
                  }
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
                    src="/blog/author2.png"
                    alt={blog.name}
                    width={36}
                    height={36}
                    // className="rounded-full bg-pink1 object-cover"
                    className={`rounded-full bg-pink1 object-cover  ${
                      index < 2 ? "bg-pink1" : "bg-red1"
                    }`}
                  />
                  <div className="">
                    <p className="text-black text-dt font-medium">
                      Lana Steiner
                      {/* {blog.author.name} */}
                    </p>
                    <p className="text-cgray text-dt font-normal">
                      {formatDate(blog.created_at)}
                      {/* {blog.author.date} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
