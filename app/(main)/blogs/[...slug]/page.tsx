import Link from "next/link";
import BlogsCard from "@/components/blogs/blogsCard";
const recentNews = [
  {
    title:
      "Stryker Receives FDA Clearance for OptaBlate® BVN Basivertebral Nerve Ablation System",
  },
  {
    title:
      "THINK Surgical Announces 1,000th Procedure Milestone for the TMINI® Miniature Robotic System",
  },
  {
    title: "Intuitive Announces CEO Transition",
  },
  {
    title:
      "EndoQuest Robotics, Inc. Completes First Procedures with Endoluminal Surgical System",
  },
  {
    title: "Surgical Science Announces Acquisition of Intelligent Ultrasound",
  },
  {
    title:
      "Stryker Receives FDA Clearance for OptaBlate® BVN Basivertebral Nerve Ablation System",
  },
  {
    title:
      "THINK Surgical Announces 1,000th Procedure Milestone for the TMINI® Miniature Robotic System",
  },
  {
    title: "Intuitive Announces CEO Transition",
  },
  {
    title:
      "EndoQuest Robotics, Inc. Completes First Procedures with Endoluminal Surgical System",
  },
];
const blogCards = [
  {
    category: "Allergy",
    title: "Allergy and Immunology",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Olivia Rhye",
      date: "20 Jan 2022",
      avtar: "/blog/author2.png",
    },
    image: "/blog/b1.png",
    slug: "slug1",
  },
  {
    category: "Allergy",
    title: "Allergy and Immunology",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Olivia Rhye",
      date: "20 Jan 2022",
      avtar: "/blog/author2.png",
    },
    image: "/blog/b2.png",
    slug: "slug2",
  },
  {
    category: "Medicine",
    title: "Family Medicine",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Lana Steiner",
      date: "18 Jan 2022",
      avtar: "/blog/author2.png",
    },
    image: "/blog/b3.png",
    slug: "slug3",
  },
  {
    category: "Oculoplastic",
    title: "Oculoplastic Surgery",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Lana Steiner",
      date: "18 Jan 2022",
      avtar: "/blog/author2.png",
    },
    image: "/blog/b4.png",
    slug: "slug4",
  },
];
export default function BlogDetail() {
  return (
    <>
      <div className=" flex flex-col h-auto w-full bg-white text-black">
        {/* herosection */}
        <div
          className="relative sm:h-[14.5rem] h-[10rem]  w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/homePage/heroimage.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center font-playfair">
            <h1 className="text-white text-p3xl font-bold">Blogs</h1>
          </div>
        </div>
        <div className=" md:max-w-[75vw] max-w-[85vw] w-full mx-auto flex flex-col">
          {/* detail */}
          <div className="w-full gap-[2.5rem]  flex lg:flex-row flex-col  mt-[3.25rem] ">
            {/* blog detail */}
            <div className="lg:max-w-[75%] w-full h-auto border border-black text-black">
              Render Blog Here
            </div>
            {/* recente Post */}
            <div className="lg:max-w-[25%]  w-full rounded-[0.625rem] accordion-shadow  h-fit p-[1.5rem]">
              <div className="text-[1.75rem] font-playfair font-medium text-black">
                Recent Posts
              </div>
              <div>
                {recentNews.map((data, index) => (
                  <Link href={`#`}>
                    <div
                      key={index}
                      className={`border-b last:border-b-0 py-2 ${
                        index === 0 ? " text-gray-800" : "text-blog1"
                      } text-plg font-normal leading-[1.85rem]  cursor-pointer font-sans`}
                    >
                      {data.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Articles */}
          <div className=" flex flex-col mb-[3.25rem] md:mt-[4.25rem] mt-[3rem]">
            <h2 className="text-t2 font-playfair font-medium tracking-normal mb-[1.5rem]">
              Recent Articles
            </h2>
            <div className="grid gap-x-[1rem] gap-y-[2.75rem] sm:grid-cols-2 lg:grid-cols-4 ">
              {blogCards.map((blog, index) => (
                <BlogsCard key={index} index={index} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
