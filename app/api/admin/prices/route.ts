import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const schema=z.object({productId:z.string(),mrp:z.coerce.number().min(0),currentPrice:z.coerce.number().min(0)});

export async function POST(req:Request){
  try{
    const admin=await requireAdmin();
    const parsed=schema.safeParse(await req.json());
    if(!parsed.success)return NextResponse.json({error:"Invalid price data."},{status:400});
    const p=await prisma.product.findUnique({where:{id:parsed.data.productId}});
    if(!p)return NextResponse.json({error:"Product not found."},{status:404});
    await prisma.$transaction([
      prisma.priceHistory.create({data:{productId:p.id,oldMrp:p.mrp,oldPrice:p.currentPrice,newMrp:parsed.data.mrp,newPrice:parsed.data.currentPrice,changedBy:admin.id}}),
      prisma.product.update({where:{id:p.id},data:{mrp:parsed.data.mrp,currentPrice:parsed.data.currentPrice}})
    ]);
    return NextResponse.json({ok:true});
  }catch(e:any){return NextResponse.json({error:e?.message==="UNAUTHORIZED"?"Unauthorized":"Unable to update price."},{status:e?.message==="UNAUTHORIZED"?401:500});}
}
