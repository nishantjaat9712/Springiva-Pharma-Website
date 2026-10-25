import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage({ searchParams }: {searchParams: Promise<{q?:string;category?:string}>}) {
  const params = await searchParams;
  const q = params.q?.trim();
  const category = params.category;
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(q ? { OR: [{productName:{contains:q, mode:"insensitive"}},{composition:{contains:q, mode:"insensitive"}},{brandName:{contains:q, mode:"insensitive"}}] } : {}),
      ...(category ? {category:{slug:category}} : {})
    },
    include:{category:true},
    orderBy:{productName:"asc"}
  });
  const categories = await prisma.category.findMany({orderBy:{name:"asc"}});

  return <>
    <Header/>
    <main>
      <section className="page-hero"><div className="container"><div className="breadcrumb">Home / Products</div><div className="eyebrow">Product Portfolio</div><h1 className="h2">Quality Products for Healthcare Needs</h1><p className="lead">Explore the Springiva Pharma portfolio. Product information remains editable through the secure administration system.</p></div></section>
      <section className="section">
        <div className="container">
          <form style={{display:"grid",gridTemplateColumns:"1fr 260px auto",gap:12,marginBottom:35}} action="/products">
            <input name="q" defaultValue={q} placeholder="Search medicines..." style={{padding:13,border:"1px solid var(--line)",borderRadius:11}}/>
            <select name="category" defaultValue={category||""} style={{padding:13,border:"1px solid var(--line)",borderRadius:11}}><option value="">All categories</option>{categories.map(c=><option key={c.id} value={c.slug}>{c.name}</option>)}</select>
            <button className="btn btn-primary">Search</button>
          </form>
          {products.length ? <div className="grid grid-3">{products.map(p=><ProductCard key={p.id} product={p as any}/>)}</div> : <div className="card"><h3>No products found</h3><p className="meta">Try a different search term or category.</p></div>}
        </div>
      </section>
    </main>
    <Footer/>
  </>;
}
