import { prisma } from "@/lib/prisma";
export default async function Enquiries(){
 const items=await prisma.enquiry.findMany({orderBy:{createdAt:"desc"}});
 return <><div className="eyebrow">Inbound</div><h1 className="h2">Enquiries</h1><div className="table-wrap"><table className="admin-table"><thead><tr><th>Contact</th><th>Company</th><th>Type</th><th>Message</th><th>Status</th><th>Date</th></tr></thead><tbody>{items.map(x=><tr key={x.id}><td><strong>{x.name}</strong><div className="meta">{x.email}{x.phone?` · ${x.phone}`:""}</div></td><td>{x.company||"—"}</td><td>{x.type}</td><td style={{maxWidth:350}}>{x.message}</td><td><span className="status active">{x.status}</span></td><td>{x.createdAt.toLocaleDateString("en-IN")}</td></tr>)}</tbody></table></div></>
}
