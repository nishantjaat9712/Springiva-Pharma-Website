import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const raw = contentType.includes("application/json") ? await req.json() : Object.fromEntries(await req.formData());
    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) return NextResponse.json({error:"Please check the submitted fields."},{status:400});

    await prisma.enquiry.create({data:{
      ...parsed.data,
      company: parsed.data.company || null,
      phone: parsed.data.phone || null
    }});

    if (contentType.includes("application/json")) return NextResponse.json({ok:true});
    return NextResponse.redirect(new URL("/?sent=1#contact", req.url));
  } catch {
    return NextResponse.json({error:"Unable to submit enquiry."},{status:500});
  }
}
