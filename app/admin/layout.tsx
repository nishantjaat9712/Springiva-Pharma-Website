import Link from "next/link";
import { LayoutDashboard, Pill, Plus, History, Inbox, Settings, LogOut } from "lucide-react";

export default async function AdminLayout({children}:{children:React.ReactNode}){
  return <div className="admin-shell">
    <aside className="admin-side">
      <div className="admin-brand">SPRINGIVA<br/><span style={{color:"#7be2be"}}>PHARMA CMS</span></div>
      <Link href="/admin"><LayoutDashboard size={17}/>Dashboard</Link>
      <Link href="/admin/medicines"><Pill size={17}/>Medicines</Link>
      <Link href="/admin/medicines/add"><Plus size={17}/>Add Medicine</Link>
      <Link href="/admin/prices"><History size={17}/>Price Management</Link>
      <Link href="/admin/enquiries"><Inbox size={17}/>Enquiries</Link>
      <Link href="/admin/settings"><Settings size={17}/>Settings</Link>
      <form action="/api/auth/logout" method="post" style={{marginTop:25}}><button className="btn" style={{background:"rgba(255,255,255,.08)",color:"white",width:"100%"}}><LogOut size={17}/>Logout</button></form>
    </aside>
    <main className="admin-main">{children}</main>
  </div>
}
