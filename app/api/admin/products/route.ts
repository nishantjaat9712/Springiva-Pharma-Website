import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema, slugify } from "@/lib/validation";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const form = await req.formData();
    const data = Object.fromEntries(form.entries());
    const parsed = productSchema.safeParse(data);
    if (!parsed.success) return NextResponse.json({error:"Invalid product data."},{status:400});
    let slug = slugify(parsed.data.productName);
    const existing = await prisma.product.findUnique({where:{slug}});
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const file = form.get("image");
    let imageUrl: string | null = null;
    if (file instanceof File && file.size > 0) {
      if (!["image/jpeg","image/png","image/webp"].includes(file.type) || file.size > 5*1024*1024)
        return NextResponse.json({error:"Image must be JPG, PNG or WEBP and under 5MB."},{status:400});
      const bytes = Buffer.from(await file.arrayBuffer());
      const fs = await import("node:fs/promises");
      const path = await import("node:path");
      const dir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(dir,{recursive:true});
      const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const filename = `${crypto.randomUUID()}.${ext}`;
      await fs.writeFile(path.join(dir,filename),bytes);
      imageUrl = `/uploads/${filename}`;
    }

    const product = await prisma.product.create({
      data:{
        ...parsed.data,
        slug,
        imageUrl,
        mrp: parsed.data.mrp ?? null,
        currentPrice: parsed.data.currentPrice ?? null,
        strength: parsed.data.strength || null,
        dosageForm: parsed.data.dosageForm || null,
        packSize: parsed.data.packSize || null,
        manufacturer: parsed.data.manufacturer || null,
        manufacturingLocation: parsed.data.manufacturingLocation || null,
        description: parsed.data.description || null,
        approvedInfo: parsed.data.approvedInfo || null,
        sku: parsed.data.sku || null
      }
    });
    return NextResponse.json(product,{status:201});
  } catch (e:any) {
    return NextResponse.json({error:e?.message === "UNAUTHORIZED" ? "Unauthorized" : "Unable to create product."},{status:e?.message==="UNAUTHORIZED"?401:500});
  }
}
