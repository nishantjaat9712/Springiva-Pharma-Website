"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav">
        <Link href="/" className="logo" onClick={close}>
          <span className="logo-mark">S</span>
          <span>SPRINGIVA PHARMA</span>
        </Link>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          <Link href="/#about" onClick={close}>About Us</Link>
          <Link href="/products" onClick={close}>Products</Link>
          <Link href="/#quality" onClick={close}>Quality & Manufacturing</Link>
          <Link href="/#third-party" onClick={close}>Third-Party Manufacturing</Link>
          <Link href="/#contact" onClick={close} className="nav-cta">Enquire Now <ArrowUpRight size={15}/></Link>
        </nav>
      </div>
    </header>
  );
}
