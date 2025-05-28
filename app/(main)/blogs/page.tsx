import LatestBlogs from "@/components/blogs/latestblogs";
import BlogsCard from "@/components/blogs/blogsCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function Blogs() {

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
      slug: "slug5",
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
      slug: "slug6",
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
      slug: "slug7",
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
      slug: "slug8",
    },
  ];


  const blogsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts`
  );
  const result = await blogsData.json();

  const publishedPosts = result.data.filter(
    (post: any) => post.status?.value === 'published' && post.published_at == null
  );

  const publishedLater = result.data.filter(
    (post: any) => post.status?.value === 'draft' && post.published_at !== null
  );

  return (
    <>
      <div className="w-full h-auto bg-white flex flex-col">
        {/* herosection */}
        <Breadcrumbs title="Blogs" bgImage="/homePage/heroimage.jpg" />
        <div className=" sm:max-w-[75vw] max-w-[85vw] mx-auto w-full  my-[2rem]  text-black">
          {/* latest Articles */}
          <div className="flex flex-col mb-[1rem]">
            <h2 className="text-t2 font-playfair font-medium tracking-normal mb-[1.5rem]">
              Latest Articles
            </h2>
            <div className=" flex flex-col gap-[2rem]">
              
              {publishedPosts.length > 0 && <LatestBlogs publishedPosts = {publishedPosts} /> }

            </div>
          </div>
          {/* Upcoming Articles */}
          <div className="flex flex-col mb-[3rem]">
            <h2 className="text-t2 font-playfair font-medium tracking-normal mb-[1.5rem]">
              Upcomming Articles
            </h2>
            <div className="grid gap-x-[1rem] gap-y-[2.75rem] sm:grid-cols-2 lg:grid-cols-4 ">
              {blogCards.map((blog, index) => (
                <BlogsCard key={index} index={index} blog={blog} />
              ))}
            </div>
          </div>
          {/* load more */}
          <div>
            <div className="flex items-center justify-center mt-[1rem] mb-[2rem]">
              <div className=" cursor-pointer bg-black text-white h-[3rem] max-w-[9rem] w-full font-sans leading-[1.5rem] text-pxl font-normal flex items-center justify-center rounded-full ">
                <p>Load More</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
