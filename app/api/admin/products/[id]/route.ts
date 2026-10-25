import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema, slugify } from "@/lib/validation";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: Request,{params}:{params:Promise<{id:string}>}) {
  try {
    await requireAdmin();
    const {id}=await params;
    const form=await req.formData();
    const data=Object.fromEntries(form.entries());
    const parsed=productSchema.safeParse(data);
    if(!parsed.success) return NextResponse.json({error:"Invalid product data."},{status:400});
    const current=await prisma.product.findUnique({where:{id}});
    if(!current) return NextResponse.json({error:"Not found."},{status:404});
    const file=form.get("image");
    let imageUrl=current.imageUrl;
    if(file instanceof File && file.size>0){
      if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>5*1024*1024)
        return NextResponse.json({error:"Invalid image."},{status:400});
      const bytes=Buffer.from(await file.arrayBuffer());
      const fs=await import("node:fs/promises"); const path=await import("node:path");
      const dir=path.join(process.cwd(),"public","uploads"); await fs.mkdir(dir,{recursive:true});
      const ext=file.type==="image/png"?"png":file.type==="image/webp"?"webp":"jpg";
      const filename=`${crypto.randomUUID()}.${ext}`; await fs.writeFile(path.join(dir,filename),bytes); imageUrl=`/uploads/${filename}`;
    }
    const newSlug=slugify(parsed.data.productName);
    const updated=await prisma.product.update({
      where:{id},
      data:{
        ...parsed.data, slug:newSlug, imageUrl,
        mrp:parsed.data.mrp??null,currentPrice:parsed.data.currentPrice??null,
        strength:parsed.data.strength||null,dosageForm:parsed.data.dosageForm||null,packSize:parsed.data.packSize||null,
        manufacturer:parsed.data.manufacturer||null,manufacturingLocation:parsed.data.manufacturingLocation||null,
        description:parsed.data.description||null,approvedInfo:parsed.data.approvedInfo||null,sku:parsed.data.sku||null
      }
    });
    return NextResponse.json(updated);
  } catch(e:any){ return NextResponse.json({error:e?.message==="UNAUTHORIZED"?"Unauthorized":"Unable to update product."},{status:e?.message==="UNAUTHORIZED"?401:500});}
}

export async function DELETE(_req:Request,{params}:{params:Promise<{id:string}>}) {
  try {
    await requireAdmin(); const {id}=await params;
    await prisma.product.update({where:{id},data:{status:"INACTIVE"}});
    return NextResponse.json({ok:true});
  } catch(e:any){return NextResponse.json({error:e?.message==="UNAUTHORIZED"?"Unauthorized":"Unable to deactivate."},{status:e?.message==="UNAUTHORIZED"?401:500});}
}
