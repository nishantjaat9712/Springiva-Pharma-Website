import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Medicines({searchParams}:{searchParams:Promise<{q?:string}>}){
  const {q}=await searchParams;
  const products=await prisma.product.findMany({where:q?{OR:[{productName:{contains:q,mode:"insensitive"}},{composition:{contains:q,mode:"insensitive"}}]}:{},include:{category:true},orderBy:{updatedAt:"desc"}});
  return <><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div className="eyebrow">Catalog</div><h1 className="h2">Medicines</h1></div><Link href="/admin/medicines/add" className="btn btn-primary">Add Medicine</Link></div>
  <form style={{display:"flex",gap:10,marginTop:20}}><input name="q" defaultValue={q} placeholder="Search medicine..." style={{padding:12,border:"1px solid #cfdce5",borderRadius:9,flex:1}}/><button className="btn btn-outline">Search</button></form>
  <div className="table-wrap"><table className="admin-table"><thead><tr><th>Medicine</th><th>Composition</th><th>Category</th><th>Price</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{products.map(p=><tr key={p.id}><td><strong>{p.productName}</strong><div className="meta">{p.sku||"No SKU"}</div></td><td>{p.composition}</td><td>{p.category.name}</td><td>{p.currentPrice?`₹${Number(p.currentPrice).toLocaleString("en-IN")}`:"—"}</td><td><span className={`status ${p.status==="ACTIVE"?"active":"inactive"}`}>{p.status}</span></td><td>{p.updatedAt.toLocaleDateString("en-IN")}</td><td><Link className="btn btn-outline" href={`/admin/medicines/edit/${p.id}`}>Edit</Link></td></tr>)}</tbody></table></div>
  </>;
}
