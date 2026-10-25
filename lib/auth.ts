import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const COOKIE = "springiva_admin";
const secret = new TextEncoder().encode(process.env.JWT_SECRET || "development-secret-change-me");

export async function createAdminSession(adminId: string) {
  const token = await new SignJWT({ sub: adminId, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function getAdminSession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin" || typeof payload.sub !== "string") return null;
    return { id: payload.sub };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}

export async function clearAdminSession() {
  (await cookies()).set(COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
}
