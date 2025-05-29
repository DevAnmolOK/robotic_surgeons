// lib/api.ts
export type PageData = {
  id: number;
  name: string;
  content: string;
  description: string;
  image: string | null;
};

export type SeoMeta = {
  seo_title: string;
  seo_description: string;
  index: string;
};

export type ApiResponse = {
  pageData: PageData[];
  meta: {
    seo_meta: SeoMeta;
  };
};

export async function getPageData(slug: string): Promise<ApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/page/${slug}`, {
    cache: 'no-store', // or 'force-cache' if you want to cache
  });

  if (!res.ok) {
    throw new Error('Failed to fetch page data');
  }

  return res.json();
}


export const formatDate = (date: any) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
