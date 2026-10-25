import Link from "next/link";
import { ArrowRight, Check, FlaskConical, Handshake, ShieldCheck, Truck, Building2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: { category: true },
    orderBy: { updatedAt: "desc" },
    take: 4
  });

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <Reveal>
              <div className="eyebrow">SPRINGIVA PHARMA</div>
              <h1 className="title">Springing Towards Better Health</h1>
              <p className="lead">Quality Medicines. Trusted Partnerships. Better Healthcare.</p>
              <p className="lead" style={{fontSize:16}}>Springiva Pharma is a pharmaceutical company focused on delivering quality healthcare products through reliable manufacturing and responsible marketing practices.</p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:28}}>
                <Link href="/products" className="btn btn-primary">Explore Our Products <ArrowRight size={17}/></Link>
                <Link href="#contact" className="btn btn-outline">Contact Us</Link>
              </div>
            </Reveal>
            <Reveal delay={.15}>
              <div className="hero-visual" aria-label="Healthcare visual">
                <div className="molecule one"></div><div className="molecule two"></div>
                <div style={{position:"absolute",top:55,left:45,color:"rgba(255,255,255,.75)",fontSize:12,fontWeight:800,letterSpacing:".16em"}}>QUALITY • TRUST • CARE</div>
                <div className="hero-glass">
                  <strong>Healthcare built on dependable partnerships.</strong>
                  <p style={{opacity:.78,lineHeight:1.6}}>A modern, quality-focused pharmaceutical platform designed for products, partnerships and responsible growth.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container grid grid-2" style={{alignItems:"center"}}>
            <Reveal>
              <div className="eyebrow">About Springiva</div>
              <h2 className="h2">Committed to Better Healthcare</h2>
              <p className="lead">At Springiva Pharma, our vision is to contribute to better healthcare by providing quality pharmaceutical products through trusted manufacturing partners and responsible business practices.</p>
              <p className="lead" style={{fontSize:16}}>We focus on product quality, reliable supply, professional service and long-term relationships with healthcare professionals, distributors and business partners.</p>
              <div className="philosophy"><span>Quality</span><i>→</i><span>Trust</span><i>→</i><span>Reliability</span><i>→</i><span>Better Healthcare</span></div>
              <Link href="#contact" className="btn btn-primary" style={{marginTop:26}}>Know More About Us</Link>
            </Reveal>
            <Reveal delay={.1}>
              <div className="card" style={{padding:38,background:"linear-gradient(145deg,#eef7fb,#f2faf6)"}}>
                <FlaskConical size={45} color="#0b5ea8"/>
                <h3 style={{fontSize:28}}>A quality-oriented approach</h3>
                <p className="lead" style={{fontSize:16}}>Our model is built around dependable sourcing, product information discipline, professional coordination and long-term partnerships.</p>
                <div className="grid grid-2">
                  <div className="stat"><b>01</b><span>Quality Focus</span></div>
                  <div className="stat"><b>02</b><span>Reliable Supply</span></div>
                  <div className="stat"><b>03</b><span>Professional Service</span></div>
                  <div className="stat"><b>04</b><span>Growing Portfolio</span></div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-soft">
          <div className="container">
            <Reveal>
              <div className="eyebrow">Our Products</div>
              <h2 className="h2">Quality Products for Healthcare Needs</h2>
              <p className="lead">Our product portfolio is developed with a focus on quality, consistency and practical healthcare requirements.</p>
            </Reveal>
            <div className="grid grid-4" style={{marginTop:38}}>
              {products.map((p, i) => <Reveal key={p.id} delay={i*.06}><ProductCard product={p as any}/></Reveal>)}
            </div>
            <div style={{textAlign:"center",marginTop:35}}><Link href="/products" className="btn btn-primary">View All Products <ArrowRight size={16}/></Link></div>
            <div className="notice" style={{marginTop:30}}>Product availability, composition and indications should be presented only according to the applicable approved product information and regulatory requirements.</div>
          </div>
        </section>

        <section id="quality" className="section">
          <div className="container">
            <Reveal>
              <div className="eyebrow">Quality & Manufacturing</div>
              <h2 className="h2">Quality You Can Trust</h2>
              <p className="lead">Springiva Pharma works with selected manufacturing partners and focuses on maintaining quality-oriented pharmaceutical operations.</p>
            </Reveal>
            <div className="grid grid-3" style={{marginTop:38}}>
              {[
                ["Quality-oriented manufacturing",ShieldCheck],
                ["Reliable sourcing",Truck],
                ["Consistent product standards",Check],
                ["Proper packaging",Building2],
                ["Regulatory compliance",ShieldCheck],
                ["Reliable supply",Handshake]
              ].map(([text,Icon],i)=> <Reveal key={String(text)} delay={i*.05}><div className="card card-hover"><Icon color="#16866a"/><h3>{String(text)}</h3><p className="meta">Focused on dependable processes and applicable requirements.</p></div></Reveal>)}
            </div>
            <div className="notice" style={{marginTop:30}}>Manufactured at WHO-GMP certified plants, wherever applicable to the specific product/manufacturer. This statement must be verified product-by-product before publication.</div>
          </div>
        </section>

        <section id="third-party" className="section section-soft">
          <div className="container grid grid-2" style={{alignItems:"center"}}>
            <Reveal>
              <div className="eyebrow">Third-Party Manufacturing</div>
              <h2 className="h2">Your Trusted Pharmaceutical Manufacturing Partner</h2>
              <p className="lead">Looking for reliable pharmaceutical third-party manufacturing? Springiva Pharma can work with manufacturing partners for selected pharmaceutical formulations and product requirements.</p>
            </Reveal>
            <Reveal delay={.1}>
              <div className="card">
                {["Pharmaceutical formulation manufacturing","Product development coordination","Packaging requirements","Private/third-party manufacturing","Supply coordination","Product-specific manufacturing requirements"].map(x=><div key={x} style={{display:"flex",gap:10,alignItems:"center",padding:"12px 0",borderBottom:"1px solid var(--line)"}}><Check size={17} color="#16866a"/><span>{x}</span></div>)}
                <Link href="#contact" className="btn btn-green" style={{marginTop:22}}>Enquire for Third-Party Manufacturing</Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Reveal><div className="eyebrow">Why Springiva Pharma</div><h2 className="h2">Better Healthcare. Better Tomorrow.</h2></Reveal>
            <div className="grid grid-4" style={{marginTop:35}}>
              {[
                ["Quality Focused","We believe quality is the foundation of a trusted pharmaceutical business."],
                ["Reliable Supply","We focus on dependable sourcing and timely coordination."],
                ["Professional Approach","We aim to build long-term relationships with healthcare and business partners."],
                ["Growing Product Portfolio","We are continuously working toward expanding our pharmaceutical product portfolio."]
              ].map(([a,b],i)=><Reveal key={a} delay={i*.06}><div className="card card-hover"><div className="eyebrow">0{i+1}</div><h3>{a}</h3><p className="meta">{b}</p></div></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section" style={{paddingTop:20}}>
          <div className="container">
            <div className="contact-wrap" id="contact">
              <div className="grid grid-2">
                <div>
                  <div className="eyebrow" style={{color:"#7be2be"}}>Let's Connect</div>
                  <h2 className="h2" style={{color:"white"}}>Let's Build Better Healthcare Together</h2>
                  <p style={{color:"#c8dbe8",lineHeight:1.8}}>For product enquiries, distribution opportunities, third-party manufacturing or business partnerships, contact our team.</p>
                  <p style={{marginTop:30}}><strong>Springiva Pharma</strong><br/>sales@springiva.com<br/>Delhi NCR, India</p>
                </div>
                <form className="form" action="/api/enquiries" method="post">
                  <div className="form-row"><input name="name" placeholder="Name" required/><input name="company" placeholder="Company"/></div>
                  <div className="form-row"><input name="email" type="email" placeholder="Email" required/><input name="phone" placeholder="Phone"/></div>
                  <select name="type" defaultValue="GENERAL"><option value="PRODUCT">Product Enquiry</option><option value="DISTRIBUTION">Distribution Opportunity</option><option value="THIRD_PARTY">Third-Party Manufacturing</option><option value="PARTNERSHIP">Business Partnership</option><option value="GENERAL">General Enquiry</option></select>
                  <textarea name="message" placeholder="Tell us how we can help..." required/>
                  <button className="btn btn-green" type="submit">Send Enquiry</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
