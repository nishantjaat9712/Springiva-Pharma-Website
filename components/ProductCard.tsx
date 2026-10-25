import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Product = {
  slug: string;
  productName: string;
  composition: string;
  dosageForm: string | null;
  category: { name: string };
  imageUrl: string | null;
  currentPrice: any;
};

export default function ProductCard({ product }: {product: Product}) {
  return (
    <article className="card card-hover">
      <div className="product-image">
        {product.imageUrl ? <img src={product.imageUrl} alt={product.productName} /> : <div className="product-placeholder">SPRINGIVA</div>}
      </div>
      <span className="tag">{product.category.name}</span>
      <h3 className="product-name">{product.productName}</h3>
      <div className="meta">{product.composition}</div>
      {product.dosageForm && <div className="meta" style={{marginTop:5}}>Dosage form: {product.dosageForm}</div>}
      {product.currentPrice && <div style={{fontWeight:800,marginTop:12}}>₹{Number(product.currentPrice).toLocaleString("en-IN")}</div>}
      <div className="product-actions">
        <Link href={`/products/${product.slug}`} className="btn btn-outline">View Details <ArrowUpRight size={15}/></Link>
        <Link href="/#contact" className="btn btn-primary">Enquire</Link>
      </div>
    </article>
  );
}
