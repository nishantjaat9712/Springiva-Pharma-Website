import { PrismaClient, ProductStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD || "ChangeThisStrongPassword123!";
  const email = process.env.ADMIN_EMAIL || "admin@springiva.com";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash }
  });

  const categories = [
    ["Anti-Infective", "anti-infective"],
    ["Pain & Inflammation", "pain-inflammation"],
    ["Respiratory & Allergy", "respiratory-allergy"],
    ["Gastroenterology", "gastroenterology"]
  ];

  for (const [name, slug] of categories) {
    await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { name, slug }
    });
  }

  const categoryMap = Object.fromEntries(
    (await prisma.category.findMany()).map(c => [c.slug, c.id])
  );

  const products = [
    {
      brandName: "PRIMOXY™-625",
      productName: "PRIMOXY™-625",
      slug: "primoxy-625",
      composition: "Amoxicillin 500 mg + Clavulanic Acid 125 mg",
      strength: "625 mg",
      dosageForm: "Tablet",
      packSize: "Placeholder — update in CMS",
      categoryId: categoryMap["anti-infective"],
      description: "Product information should be presented only according to applicable approved product information.",
      approvedInfo: "Placeholder — replace with approved product information.",
      status: ProductStatus.ACTIVE
    },
    {
      brandName: "ACEIVA SP",
      productName: "ACEIVA SP",
      slug: "aceiva-sp",
      composition: "Aceclofenac + Paracetamol + Serratiopeptidase",
      dosageForm: "Tablet",
      packSize: "Placeholder — update in CMS",
      categoryId: categoryMap["pain-inflammation"],
      description: "Product information should be presented only according to applicable approved product information.",
      approvedInfo: "Placeholder — replace with approved product information.",
      status: ProductStatus.ACTIVE
    },
    {
      brandName: "MONTENIA™ L",
      productName: "MONTENIA™ L",
      slug: "montenia-l",
      composition: "Montelukast + Levocetirizine",
      dosageForm: "Tablet",
      packSize: "Placeholder — update in CMS",
      categoryId: categoryMap["respiratory-allergy"],
      description: "Product information should be presented only according to applicable approved product information.",
      approvedInfo: "Placeholder — replace with approved product information.",
      status: ProductStatus.ACTIVE
    },
    {
      brandName: "PANKAZ-D",
      productName: "PANKAZ-D",
      slug: "pankaz-d",
      composition: "Pantoprazole + Domperidone",
      dosageForm: "Capsule",
      packSize: "Placeholder — update in CMS",
      categoryId: categoryMap["gastroenterology"],
      description: "Product information should be presented only according to applicable approved product information.",
      approvedInfo: "Placeholder — replace with approved product information.",
      status: ProductStatus.ACTIVE
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
  }

  console.log(`Seeded admin: ${email}`);
  console.log("Seeded 4 sample products.");
}

main().finally(() => prisma.$disconnect());
