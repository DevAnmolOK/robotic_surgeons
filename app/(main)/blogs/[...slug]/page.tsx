import Link from "next/link";
import Image from "next/image";
import BlogCard from "@/components/homepageComponent/blogcard";
import { formatDate } from "@/lib/api";

type Params = Promise<{ slug: string }>

export default async function BlogDetail({ params }: { params: Params }) {

  const { slug } = await params;

  const postRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`);
  const postData = await postRes.json();
  const post = postData.data;

  const blogsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts?per_page=6`
  );
  const result = await blogsData.json();

  const publishedPosts = result.data.filter(
    (post: any) => post.status?.value === 'published' && post.published_at == null
  );

  const postCategoryId = post.categories?.[0]?.id;

  const relatedPosts = publishedPosts.filter(
    (item: any) =>
      item.id !== post.id &&
      item.categories?.some((cat: any) => cat.id === postCategoryId)
  );

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
            <div className="lg:max-w-[75%] w-full h-auto text-black">
              {post.image && (
                <Image
                  src={post.image
                    ? post.image
                    : 'https://placehold.co/400x900?text=No+Image'
                  }
                  alt={post.name}
                  width={800}
                  height={400}
                  unoptimized
                  className="w-full h-100 mb-6 object-cover shadow"
                />
              )}

              {post.content && (
                <div className="custom-font-style mb-[1.5rem]" dangerouslySetInnerHTML={{ __html: post.content }} />
              )}

            </div>
            {/* recente Post */}
            <div className="lg:max-w-[25%]  w-full rounded-[0.625rem] accordion-shadow h-fit pt-0 pr-[1.5rem] pb-[1.5rem] pl-[1.5rem]">
              <div className="text-[1.75rem] font-playfair font-medium text-black">
                Recent Posts
              </div>
              <div>
                {publishedPosts.map((item: any, index: any) => (
                  <div className="flex gap-4 items-center mt-3" key={index}>
                    {item.image && (
                      <Image
                        src={item.image
                          ? item.image
                          : 'https://placehold.co/64x64.png'
                        }
                        alt={item.name}
                        width={80}
                        height={80}
                        unoptimized
                        className="object-cover"
                      />
                    )}
                    <div>
                      <div
                        className="flex flex-col border-b last:border-b-0 text-blog1 text-plg font-normal leading-[1.85rem] cursor-pointer font-sans hover:text-black line-clamp-1"
                      >
                        <Link href={`/blogs/${item.slug}`}>{item.name ?? ''}</Link>
                        <p className="text-cgray text-dt font-normal">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 &&
            <div className=" flex flex-col mb-[3.25rem] md:mt-[4.25rem] mt-[1.5rem]">
              <h2 className="text-t2 font-playfair font-medium tracking-normal mb-[1.5rem]">
                Related Articles
              </h2>
              <div className="grid gap-x-[1rem] gap-y-[2.75rem] sm:grid-cols-2 lg:grid-cols-4 ">
                {relatedPosts.map((blog: any, index: any) => (
                  <BlogCard index={index} blog={blog} key={index} />
                ))}
              </div>
            </div>
          }

        </div>
      </div>
    </>
  );
}
