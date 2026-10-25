import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";
import { createAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const parsed = loginSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({error:"Invalid credentials."},{status:400});

    const admin = await prisma.admin.findUnique({where:{email:parsed.data.email.toLowerCase()}});
    if (!admin || !(await bcrypt.compare(parsed.data.password, admin.passwordHash))) {
      return NextResponse.json({error:"Invalid email or password."},{status:401});
    }
    await createAdminSession(admin.id);
    return NextResponse.json({ok:true});
  } catch {
    return NextResponse.json({error:"Login failed."},{status:500});
  }
}
