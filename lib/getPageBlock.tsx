// utils/getPageBlock.ts
export async function getPageBlock(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/block/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch block data");
  return res.json();
}
