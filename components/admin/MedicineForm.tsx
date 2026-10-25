"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MedicineForm({categories,product}:{categories:any[];product?:any}){
  const router=useRouter(); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
  async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setLoading(true);setError("");const form=new FormData(e.currentTarget);const url=product?`/api/admin/products/${product.id}`:"/api/admin/products";const r=await fetch(url,{method:product?"PATCH":"POST",body:form});const d=await r.json();setLoading(false);if(!r.ok){setError(d.error||"Unable to save");return;}router.push("/admin/medicines");router.refresh();}
  return <form className="admin-form" onSubmit={submit} encType="multipart/form-data">
    <div className="admin-form-grid">
      {[
        ["brandName","Brand Name"],["productName","Product Name"],["composition","Composition"],["strength","Strength"],["dosageForm","Dosage Form"],["packSize","Pack Size"],["manufacturer","Manufacturer"],["manufacturingLocation","Manufacturing Location"],["mrp","MRP"],["currentPrice","Current Price"],["sku","SKU/Product Code"]
      ].map(([name,label])=><div className="field" key={name}><label>{label}</label><input name={name} defaultValue={product?.[name]?.toString()||""} /></div>)}
      <div className="field"><label>Category</label><select name="categoryId" defaultValue={product?.categoryId||categories[0]?.id}>{categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
      <div className="field"><label>Product Status</label><select name="status" defaultValue={product?.status||"ACTIVE"}><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></div>
      <div className="field full"><label>Product Description</label><textarea name="description" defaultValue={product?.description||""}/></div>
      <div className="field full"><label>Approved Product Information</label><textarea name="approvedInfo" defaultValue={product?.approvedInfo||""}/></div>
      <div className="field full"><label>Product Image (JPG, PNG, WEBP, max 5MB)</label><input type="file" name="image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"/></div>
    </div>
    {error&&<div className="alert" style={{marginTop:18}}>{error}</div>}
    <div className="admin-actions"><button className="btn btn-primary" disabled={loading}>{loading?"Saving...":"Save Medicine"}</button><button type="button" className="btn btn-outline" onClick={()=>router.back()}>Cancel</button></div>
  </form>
}
