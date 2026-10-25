import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(200)
});

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(150).optional(),
  email: z.email(),
  phone: z.string().trim().max(30).optional(),
  type: z.enum(["PRODUCT", "DISTRIBUTION", "THIRD_PARTY", "PARTNERSHIP", "GENERAL"]),
  message: z.string().trim().min(10).max(5000)
});

export const productSchema = z.object({
  brandName: z.string().trim().min(1).max(150),
  productName: z.string().trim().min(1).max(150),
  composition: z.string().trim().min(1).max(500),
  strength: z.string().trim().max(100).optional(),
  dosageForm: z.string().trim().max(100).optional(),
  categoryId: z.string().min(1),
  packSize: z.string().trim().max(150).optional(),
  mrp: z.coerce.number().min(0).max(100000000).optional(),
  currentPrice: z.coerce.number().min(0).max(100000000).optional(),
  manufacturer: z.string().trim().max(200).optional(),
  manufacturingLocation: z.string().trim().max(200).optional(),
  description: z.string().trim().max(5000).optional(),
  approvedInfo: z.string().trim().max(10000).optional(),
  sku: z.string().trim().max(100).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE")
});

export function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
