import { prisma } from "@/lib/prisma";
import PriceManager from "@/components/admin/PriceManager";

export default async function Prices(){
  const products=await prisma.product.findMany({where:{status:"ACTIVE"},orderBy:{productName:"asc"}});
  const history=await prisma.priceHistory.findMany({include:{product:true},orderBy:{changedAt:"desc"},take:30});
  return <><div className="eyebrow">Pricing</div><h1 className="h2">Price Management</h1><PriceManager products={products as any}/><div className="admin-card" style={{marginTop:25}}><h3>Price-change History</h3><div className="table-wrap" style={{marginTop:10}}><table className="admin-table"><thead><tr><th>Product</th><th>Previous</th><th>Current</th><th>Changed</th></tr></thead><tbody>{history.map(h=><tr key={h.id}><td>{h.product.productName}</td><td>₹{Number(h.oldPrice||0).toLocaleString("en-IN")}</td><td>₹{Number(h.newPrice||0).toLocaleString("en-IN")}</td><td>{h.changedAt.toLocaleString("en-IN")}</td></tr>)}</tbody></table></div></div></>
}
