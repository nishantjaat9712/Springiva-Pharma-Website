"use client";
import { useState } from "react";

export default function PriceManager({products}:{products:any[]}){
 const [id,setId]=useState(products[0]?.id||""); const p=products.find(x=>x.id===id); const [mrp,setMrp]=useState(p?.mrp?.toString()||""); const [price,setPrice]=useState(p?.currentPrice?.toString()||""); const [msg,setMsg]=useState("");
 function select(v:string){setId(v);const x=products.find(y=>y.id===v);setMrp(x?.mrp?.toString()||"");setPrice(x?.currentPrice?.toString()||"");setMsg("");}
 async function save(){const r=await fetch("/api/admin/prices",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productId:id,mrp,currentPrice:price})});const d=await r.json();setMsg(r.ok?"Price updated and history recorded.":d.error||"Update failed.");}
 return <div className="admin-form" style={{marginTop:20}}><div className="admin-form-grid"><div className="field full"><label>Medicine</label><select value={id} onChange={e=>select(e.target.value)}>{products.map(p=><option key={p.id} value={p.id}>{p.productName}</option>)}</select></div><div className="field"><label>MRP</label><input value={mrp} onChange={e=>setMrp(e.target.value)} type="number" min="0"/></div><div className="field"><label>Current Price</label><input value={price} onChange={e=>setPrice(e.target.value)} type="number" min="0"/></div></div>{msg&&<div className="notice" style={{marginTop:18}}>{msg}</div>}<button className="btn btn-primary" style={{marginTop:20}} onClick={save}>Save Price Update</button></div>
}
