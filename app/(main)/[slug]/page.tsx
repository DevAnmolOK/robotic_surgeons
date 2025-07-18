import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from 'next';
import { getPageData } from "@/lib/api";

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {

  const { slug } = await params;
  const data = await getPageData(slug);
  const seo = data.meta.seo_meta;

  return {
    title: seo.seo_title || 'Default Title',
    description: seo.seo_description || 'Default Description',
    robots: seo.index === 'index' ? 'index,follow' : 'noindex,nofollow',
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const data = await getPageData(slug);

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      {/* Hero section */}
      <Breadcrumbs title="Claim a Profile" bgImage="/homePage/heroimage.jpg" />

      {/* Content */}
      <div className="w-full bg-white h-auto">
        <div className="sm:max-w-[70%] max-w-[85%] mx-auto w-full text-black">
          <div className="flex flex-col items-center justify-center py-[2.5rem]">
            <h2 className="text-t2 font-playfair font-bold">
             How to claim a profile
            </h2>
            <div className="flex flex-col items-start pt-[1rem]">
              <div
                className="custom-font-style"
                dangerouslySetInnerHTML={{ __html: data?.pageData[0]?.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
