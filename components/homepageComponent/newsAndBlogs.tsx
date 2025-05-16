import Image from "next/image";
import { ImArrowUpRight2 } from "react-icons/im";

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

export default function BlogSection() {
  return (
    <section className="bg-white text-black py-14 px-4 font-sans ">
      <div className=" max-w-[85vw] sm:max-w-[75vw] w-full mx-auto">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-t2  font-medium mb-2  font-playfair">
              Our Latest News and Blogs
            </h2>
            <p className="text-black text-base md:text-xl    ">
              Highly recommended doctors, ready to help you feel better.
            </p>
          </div>
          <button className="bg-black text-white  px-2 sm:py-2 py-1 rounded-full hover:opacity-90 transition sm:text-base text-sm md:text-lg xl:px-6 ">
            Explore More
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm sm:p-6 hover:shadow-md transition"
            >
              <div className="relative w-full md:h-60 sm:h-52  h-48 overflow-hidden mb-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <p className="text-sm text-theme font-semibold mb-1">
                {blog.category}
              </p>
              <div className="flex justify-between items-center pt-2 ">
                <p className="font-semibold text-lg sm:text-xl">
                  {blog.title}
                </p>
                <ImArrowUpRight2 size={16} className="" />
              </div>
              <p className="text-sm sm:text-base tracking-wide text-cgray py-3 xl:py-4">
                {blog.description}
              </p>
              <div className="flex items-center gap-2 pb-3">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  width={36}
                  height={36}
                  // className="rounded-full bg-pink1 object-cover"
                  className={`rounded-full bg-pink1 object-cover  ${
                    index < 2 ? "bg-pink1" : "bg-red1"
                  }`}
                />
                <div className="">
                  <p className="text-black text-sm font-medium">
                    {blog.author.name}
                  </p>
                  <p className="text-cgray text-sm">{blog.author.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
