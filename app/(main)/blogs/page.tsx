import LatestBlogs from "@/components/blogs/latestblogs";
import BlogsCard from "@/components/blogs/blogsCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function Blogs() {
  const blogsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const result = await blogsData.json();

  const publishedPosts = result.data.filter(
    (post: any) =>
      post.status?.value === "published" && post.published_at == null
  );

  const publishedLater = result.data.filter(
    (post: any) => post.status?.value === 'draft' && post.published_at !== null
  );

  // const now = new Date();

  // const publishedLater = result.data.filter((post: any) => {
  //   const publishedAt = post.published_at ? new Date(post.published_at) : null;
  //   return post.status?.value === 'draft' && publishedAt && publishedAt > now;
  // });

  return (
    <>
      <div className="w-full h-auto bg-white flex flex-col">
        {/* herosection */}
        <Breadcrumbs title="Blogs" bgImage="/homePage/heroimage.jpg" />
        <div className=" sm:max-w-[73vw] max-w-[85vw] mx-auto w-full  my-[2rem]  text-black">
          {/* latest Articles */}
          <div className="flex flex-col mb-[1rem]">
            <h2 className="text-t2 font-playfair font-medium tracking-normal mb-[1.5rem]">
              Latest Articles
            </h2>
            <div className=" flex flex-col gap-[2rem]">
              {publishedPosts.length > 0 && (
                <LatestBlogs Posts={publishedPosts} />
              )}
            </div>
          </div>
          {/* Upcoming Articles */}
          <div className="flex flex-col mb-[3rem]">
            <h2 className="text-t2 font-playfair font-medium tracking-normal mb-[1.5rem]">
              Upcomming Articles
            </h2>
            {publishedLater.length > 0 && <BlogsCard Posts={publishedLater} />}
          </div>
          {/* load more */}
          {/* <div>
            <div className="flex items-center justify-center mt-[1rem] mb-[2rem]">
              <div className=" cursor-pointer bg-black text-white h-[3rem] max-w-[9rem] w-full font-sans leading-[1.5rem] text-pxl font-normal flex items-center justify-center rounded-full ">
                <p>Load More</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
