import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MedicineForm from "@/components/admin/MedicineForm";

export default async function EditMedicine({params}:{params:Promise<{id:string}>}){
  const {id}=await params; const [product,categories]=await Promise.all([prisma.product.findUnique({where:{id}}),prisma.category.findMany({orderBy:{name:"asc"}})]);
  if(!product)notFound(); return <><div className="eyebrow">Catalog</div><h1 className="h2">Edit Medicine</h1><MedicineForm categories={categories} product={product as any}/></>
}
