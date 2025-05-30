import BlogCard from "./blogcard";
import Post from "@/lib/helper";
import Link from "next/link";

export default function BlogSection({ Posts }: Post) {
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
          <Link href="/blogs" className="bg-black w-fit text-white px-xl py-2.5 rounded-full text-pxl hover:opacity-90 transition ">
            Explore More
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
          {Posts.map((blog: any, index: any) => (
            <BlogCard index={index} blog={blog} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

