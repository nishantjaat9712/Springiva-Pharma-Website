import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base=process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const products=await prisma.product.findMany({where:{status:"ACTIVE"},select:{slug:true,updatedAt:true}});
  return [
    {url:base,priority:1,changeFrequency:"weekly"},
    {url:`${base}/products`,priority:.9,changeFrequency:"weekly"},
    ...products.map(p=>({url:`${base}/products/${p.slug}`,lastModified:p.updatedAt,priority:.7,changeFrequency:"weekly" as const}))
  ];
}
