"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin(){
  const router=useRouter(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setError("");const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});const d=await r.json();setLoading(false);if(!r.ok){setError(d.error||"Login failed");return;}router.push("/admin");router.refresh();}
  return <div className="login-page"><div className="login-card">
    <Link href="/" className="logo"><span className="logo-mark">S</span>SPRINGIVA PHARMA</Link>
    <h1 style={{fontSize:30,marginBottom:8}}>Admin Portal</h1><p className="meta">Secure pharmaceutical management CMS.</p>
    <form className="form" onSubmit={submit} style={{marginTop:25}}><input type="email" placeholder="Admin email" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/>{error&&<div className="alert">{error}</div>}<button className="btn btn-primary" disabled={loading}>{loading?"Signing in...":"Sign in"}</button></form>
  </div></div>
}
