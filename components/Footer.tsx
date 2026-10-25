import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{color:"white"}}><span className="logo-mark">S</span>SPRINGIVA PHARMA</div>
            <p style={{lineHeight:1.8}}>Springing Towards Better Health</p>
            <p style={{lineHeight:1.8}}>Quality Medicines. Trusted Partnerships. Better Healthcare.</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <Link href="/">Home</Link>
            <Link href="/#about">About Us</Link>
            <Link href="/products">Products</Link>
            <Link href="/#quality">Quality & Manufacturing</Link>
            <Link href="/#third-party">Third-Party Manufacturing</Link>
            <Link href="/#contact">Contact Us</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>sales@springiva.com</p>
            <p>Delhi NCR, India</p>
            <p>For product enquiries, distribution opportunities, third-party manufacturing or business partnerships.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Springiva Pharma. All Rights Reserved.</span>
          <span>The information provided is for general informational purposes. Pharmaceutical products should be used only as directed by qualified healthcare professionals and in accordance with applicable regulations.</span>
        </div>
      </div>
    </footer>
  );
}
