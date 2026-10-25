import { prisma } from "@/lib/prisma";
import MedicineForm from "@/components/admin/MedicineForm";

export default async function AddMedicine(){const categories=await prisma.category.findMany({orderBy:{name:"asc"}});return <><div className="eyebrow">Catalog</div><h1 className="h2">Add Medicine</h1><MedicineForm categories={categories} /></>}
