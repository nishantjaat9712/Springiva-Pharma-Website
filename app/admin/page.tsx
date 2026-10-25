import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard(){
  const [total,active,inactive,enquiries,recent,priceUpdates,categories]=await Promise.all([
    prisma.product.count(),prisma.product.count({where:{status:"ACTIVE"}}),prisma.product.count({where:{status:"INACTIVE"}}),
    prisma.enquiry.count({where:{status:"NEW"}}),prisma.product.findMany({include:{category:true},orderBy:{createdAt:"desc"},take:6}),
    prisma.priceHistory.findMany({include:{product:true},orderBy:{changedAt:"desc"},take:5}),prisma.category.count()
  ]);
  return <><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div className="eyebrow">Control Center</div><h1 className="h2">Dashboard</h1></div><Link className="btn btn-primary" href="/admin/medicines/add">Add Medicine</Link></div>
    <div className="admin-cards" style={{marginTop:25}}>{[["Total Medicines",total],["Active Medicines",active],["Inactive Medicines",inactive],["New Enquiries",enquiries]].map(([a,b])=><div className="admin-card" key={String(a)}><span className="meta">{a}</span><b>{b}</b></div>)}</div>
    <div className="grid grid-2" style={{marginTop:25}}>
      <div className="admin-card"><h3>Recently Added</h3>{recent.map(p=><div key={p.id} style={{padding:"12px 0",borderBottom:"1px solid #edf1f4"}}><strong>{p.productName}</strong><div className="meta">{p.category.name} · {p.status}</div></div>)}</div>
      <div className="admin-card"><h3>Recently Updated Prices</h3>{priceUpdates.length?priceUpdates.map(h=><div key={h.id} style={{padding:"12px 0",borderBottom:"1px solid #edf1f4"}}><strong>{h.product.productName}</strong><div className="meta">₹{Number(h.oldPrice||0).toLocaleString("en-IN")} → ₹{Number(h.newPrice||0).toLocaleString("en-IN")}</div></div>):<p className="meta">No price updates yet.</p>}</div>
    </div>
    <div className="admin-card" style={{marginTop:25}}><h3>System Snapshot</h3><p className="meta">{categories} product categories are configured. Product, pricing and enquiry data are stored in PostgreSQL.</p></div>
  </>;
}
