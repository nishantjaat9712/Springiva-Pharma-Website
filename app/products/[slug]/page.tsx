import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function ProductDetail({ params }: {params: Promise<{slug:string}>}) {
  const {slug} = await params;
  const p = await prisma.product.findUnique({where:{slug},include:{category:true}});
  if (!p || p.status !== "ACTIVE") notFound();

  const specs = [
    ["Brand Name",p.brandName],["Composition",p.composition],["Strength",p.strength],["Dosage Form",p.dosageForm],
    ["Pack Size",p.packSize],["Category",p.category.name],["Manufacturer",p.manufacturer],["Manufacturing Location",p.manufacturingLocation],
    ["Availability",p.status === "ACTIVE" ? "Available / subject to current supply" : "Inactive"]
  ];

  return <>
    <Header/>
    <main>
      <section className="page-hero"><div className="container"><div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/products">Products</Link> / {p.productName}</div></div></section>
      <section className="section" style={{paddingTop:30}}>
        <div className="container detail-grid">
          <div className="detail-image">{p.imageUrl ? <img src={p.imageUrl} alt={p.productName}/> : <div className="product-placeholder" style={{fontSize:26}}>SPRINGIVA PHARMA</div>}</div>
          <div>
            <div className="eyebrow">{p.category.name}</div>
            <h1 className="h2">{p.productName}</h1>
            <p className="lead">{p.composition}</p>
            {p.currentPrice && <div style={{font:"800 30px Manrope",color:"var(--navy)",margin:"20px 0"}}>₹{Number(p.currentPrice).toLocaleString("en-IN")}</div>}
            <Link href="/#contact" className="btn btn-primary">Enquire About This Product</Link>
            <table className="spec-table"><tbody>{specs.map(([k,v])=>v && <tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table>
            {p.description && <div style={{marginTop:30}}><h3>General Product Information</h3><p className="meta" style={{fontSize:15}}>{p.description}</p></div>}
            {p.approvedInfo && <div className="notice" style={{marginTop:20}}>{p.approvedInfo}</div>}
            <p className="meta" style={{marginTop:22}}>Please consult a qualified healthcare professional and refer to approved product information before using any pharmaceutical product.</p>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}
