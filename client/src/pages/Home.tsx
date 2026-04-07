/*
 * DESIGN PHILOSOPHY: "Golden Isles Prestige"
 * Warm stone + coastal sage + PIER orange
 * Photography-led, layered information architecture
 * Cormorant Garamond headlines + Lato body
 */

import { useState, useEffect, useRef } from "react";
import { MapPin, Building2, TrendingUp, FileText, Phone, Mail, Globe, ChevronDown, Download, ExternalLink, Users, Landmark, Home as HomeIcon, Activity } from "lucide-react";
import { MapView } from "@/components/Map";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_hero_aerial-F8EN7S6jSG4qa3iGWwTKD6.webp";
const SITE_MAP_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_actual_hero-1_0f2db3f7.jpg";
const BRUNSWICK_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_brunswick_skyline-N9XUvfWWRMUjvnnYG6nm66.webp";
const MARSH_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_coastal_georgia_marsh-X6dYofBJpMKPXANMjhUTHH.webp";
const CONCEPT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_development_concept-QT2yhbA9b2MDhSebaUEamJ.webp";
const PDF_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/YMCA_144_Scranton_Connector_Disposition_Analysis_PIER_2026_742c9756.pdf";
const PIER_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/pier_logo_64a1e407.png";

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedStat({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useIntersectionObserver();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const navLinks = [
    { id: "overview", label: "Overview" },
    { id: "property", label: "Property" },
    { id: "zoning", label: "Zoning" },
    { id: "market", label: "Market" },
    { id: "buyers", label: "Buyer Targets" },
    { id: "map", label: "Location" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Lato', sans-serif" }}>

      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled
            ? "bg-[#1e1e1e]/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <img src={PIER_LOGO} alt="PIER Commercial Real Estate" className="h-9 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-xs tracking-widest uppercase transition-colors duration-200 ${
                  activeSection === link.id ? "text-[#CB521E]" : "text-white/80 hover:text-white"
                }`}
                style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700 }}
              >
                {link.label}
              </button>
            ))}
          </div>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest text-white px-5 py-2.5 border border-white/40 hover:bg-white/10 transition-all"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            <Download size={13} /> DOWNLOAD OM
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="overview" className="relative h-screen min-h-[600px] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Aerial view of 144 Scranton Connector, Brunswick, GA"
            className="w-full h-full object-cover ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        {/* Coordinate overlay — subtle nautical chart aesthetic */}
        <div className="absolute top-24 right-8 text-white/30 text-xs tracking-widest" style={{ fontFamily: "monospace" }}>
          31.2194° N &nbsp;|&nbsp; 81.4852° W
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-start container">
          <div className="max-w-3xl">
            <div className="fade-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#CB521E]" />
                <span className="text-white text-xs tracking-[0.25em] uppercase font-bold">Exclusive Offering | Brunswick, Georgia</span>
              </div>
            </div>
            <h1
              className="text-white mb-4 leading-tight fade-up fade-up-delay-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300 }}
            >
              144 Scranton<br />
              <span style={{ fontWeight: 700 }}>Connector</span>
            </h1>
            <p className="text-white/80 text-lg mb-2 fade-up fade-up-delay-2" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              Brunswick, Georgia 31525 &nbsp;·&nbsp; Glynn County
            </p>
            <p className="text-white/60 text-sm mb-10 fade-up fade-up-delay-2" style={{ fontFamily: "'Lato', sans-serif" }}>
              PARID: 03-10768
            </p>

            {/* Key stats row */}
            <div className="flex flex-wrap gap-6 mb-10 fade-up fade-up-delay-3">
              {[
                { label: "Site Area", value: "10.0 Acres" },
                { label: "Zoning", value: "MR District" },
                { label: "By-Right Units", value: "120–136" },
                { label: "Frontage", value: "Arterial" },
              ].map(stat => (
                <div key={stat.label} className="px-5 py-3 rounded-none bg-white">
                  <div className="text-gray-500 text-xs tracking-widest uppercase mb-1">{stat.label}</div>
                  <div className="text-[#CB521E] font-bold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem" }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 fade-up fade-up-delay-4">
              <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="btn-pier rounded-none flex items-center gap-2">
                <Download size={15} />
                Download Offering Memorandum
              </a>
              <button onClick={() => scrollTo("contact")} className="btn-sage rounded-none flex items-center gap-2">
                <Mail size={15} />
                Request Information
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("property")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      {/* ── PROPERTY SUMMARY ── */}
      <section id="property" className="py-24 bg-white">
        <div className="container">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="section-accent-bar" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#4A6741] font-bold">Property Summary</span>
            </div>
            <h2 className="mb-16" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#2C2C2C" }}>
              A Rare 10-Acre Institutional Site<br />
              <span style={{ fontWeight: 300, fontStyle: "italic" }}>in the Heart of Brunswick's Growth Corridor</span>
            </h2>
          </SectionReveal>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <div className="space-y-6">
                <p className="text-[#2C2C2C]/80 leading-relaxed text-base">
                  The YMCA of Coastal Georgia's Golden Isles facility at 144 Scranton Connector represents one of the most strategically positioned large-acreage institutional sites available in Glynn County. The YMCA is closing this location due to the age of the existing improvements and functional obsolescence for modern fitness operations — creating a significant market opportunity for a well-capitalized buyer.
                </p>
                <p className="text-[#2C2C2C]/80 leading-relaxed text-base">
                  The property's scale, its position along the Scranton Connector arterial corridor — currently the subject of active public infrastructure investment — and the surrounding growth dynamics position this asset to attract a broad and competitive buyer pool.
                </p>

                {/* Property data table */}
                <div className="border border-[#E8E0D0] mt-8">
                  {[
                    ["Address", "144 Scranton Connector, Brunswick, GA 31525"],
                    ["Glynn County PARID", "03-10768"],
                    ["Site Area", "±10.00 Acres (±435,600 SF)"],
                    ["Current Zoning", "MR — Medium Residential District"],
                    ["Current Use", "Community Fitness & Recreation Center"],
                    ["Road Frontage", "Scranton Connector (Arterial)"],
                    ["Utilities", "Public Water, Sewer, Electric, Gas"],
                    ["Assessed Value (2025)", "$982,400 (Land: $303,160 | Impr: $679,240)"],
                    ["Annual Taxes (2025)", "$24,638"],
                    ["Last Sale", "December 2011 — $698,112"],
                  ].map(([label, value], i) => (
                    <div key={label} className={`flex ${i % 2 === 0 ? "bg-[#F8F5F0]" : "bg-white"} border-b border-[#E8E0D0] last:border-b-0`}>
                      <div className="w-44 shrink-0 px-4 py-3 text-xs font-bold tracking-wide text-[#4A6741] uppercase border-r border-[#E8E0D0]">{label}</div>
                      <div className="px-4 py-3 text-sm text-[#2C2C2C]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem" }}>
                  Improvements Summary
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Building2, title: "Main Building", desc: "Single-story brick masonry structure housing primary fitness floor, gymnasium, locker rooms, administrative offices, and lobby. Estimated ±30,000–35,000 SF." },
                    { icon: Activity, title: "Indoor Natatorium", desc: "Enclosed pool building with competition-length indoor swimming pool. Estimated ±8,000–10,000 SF." },
                    { icon: HomeIcon, title: "Outdoor Pool & Deck", desc: "Outdoor swimming pool with deck area, diving facilities, and spectator seating. Seasonal use." },
                    { icon: MapPin, title: "Parking & Site", desc: "Large surface parking lot with estimated 150–200+ spaces. Athletic fields, fencing, signage, landscaping, and retention pond on eastern portion." },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4 p-4 border-l-4 border-[#CB521E] bg-[#F8F5F0]">
                      <div className="shrink-0 mt-1">
                        <Icon size={18} className="text-[#CB521E]" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#2C2C2C] mb-1">{title}</div>
                        <div className="text-sm text-[#2C2C2C]/70 leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#4A6741] text-white p-5 mt-6">
                  <div className="text-xs tracking-widest uppercase font-bold mb-2 text-white/70">Appraiser's Assessment</div>
                  <p className="text-sm leading-relaxed">
                    The primary improvements were constructed in the <strong>1970s–1990s</strong>, making the main building approximately 30–50 years old. For most prospective buyers, the existing improvements represent a <strong>demolition scenario</strong> rather than a renovation scenario. The land value, site size, and location are the primary value drivers.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
          {/* ── SITE MAP PANEL ── */}
          <SectionReveal className="mt-16">
            <div className="border border-[#E8E0D0]">
              <div className="flex items-center justify-between px-6 py-4 bg-[#F8F5F0] border-b border-[#E8E0D0]">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 bg-[#CB521E]" />
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#2C2C2C]">Aerial Site Map — ±10 Acre Boundary</span>
                </div>
                <span className="text-xs text-[#2C2C2C]/50">Source: Google Maps · PIER Commercial Real Estate</span>
              </div>
              <img
                src={SITE_MAP_IMAGE}
                alt="Aerial site map of 144 Scranton Connector showing the ±10 acre boundary outlined in orange, Brunswick, GA"
                className="w-full object-contain"
                style={{ maxHeight: "520px" }}
              />
              <div className="px-6 py-3 bg-[#F8F5F0] border-t border-[#E8E0D0] text-xs text-[#2C2C2C]/60 text-center">
                Orange boundary delineates the approximate ±10.00-acre subject site at 144 Scranton Connector, Brunswick, GA 31525 (PARID: 03-10768)
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── VALUE RANGE BANNER ── */}
      <section className="py-20 section-dark">
        <div className="container">
          <SectionReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-[#CB521E]" />
                <span className="text-xs tracking-[0.2em] uppercase text-[#CB521E] font-bold">Broker's Opinion of Value</span>
                <div className="h-px w-12 bg-[#CB521E]" />
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "white" }}>
                Estimated Value Range
              </h2>
            </div>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { scenario: "As-Is / MR Zoning", range: "$2.4M – $3.8M", note: "Multifamily developer, by-right", color: "#CB521E" },
              { scenario: "Rezoned Commercial", range: "$3.5M – $6.5M", note: "GC / OC rezoning", color: "#4A6741" },
              { scenario: "Medical / Healthcare", range: "$4.5M – $8.0M", note: "Health system / MOB campus", color: "#C9A84C" },
              { scenario: "Competitive Bid Process", range: "$4.0M – $7.0M+", note: "Dual-track marketing strategy", color: "#CB521E" },
            ].map(({ scenario, range, note, color }) => (
              <SectionReveal key={scenario}>
                <div className="bg-white/5 border border-white/10 p-6 h-full hover:bg-white/10 transition-colors">
                  <div className="w-8 h-1 mb-4" style={{ background: color }} />
                  <div className="text-white/60 text-xs tracking-widest uppercase mb-2">{scenario}</div>
                  <div className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem" }}>{range}</div>
                  <div className="text-white/50 text-xs">{note}</div>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <p className="text-white/40 text-xs text-center mt-8 max-w-2xl mx-auto">
              Broker's opinion of value only. Not a certified appraisal under USPAP standards. All estimates based on comparable land sales, development economics, and market knowledge as of March 2026.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── ZONING ANALYSIS ── */}
      <section id="zoning" className="py-24 section-warm-stone">
        <div className="container">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="section-accent-bar" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#4A6741] font-bold">Zoning Analysis</span>
            </div>
            <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#2C2C2C" }}>
              MR — Medium Residential District
            </h2>
            <p className="text-[#2C2C2C]/70 max-w-2xl mb-16 text-base leading-relaxed">
              The property is zoned <strong>MR (Medium Residential)</strong> under the Glynn County Zoning and Subdivision Ordinance (Supplement 7, August 2025). Multi-family, townhomes, cluster housing, and group dwellings are all permitted <em>by right</em> — no rezoning required for residential redevelopment.
            </p>
          </SectionReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* By-Right Uses */}
            <SectionReveal>
              <div className="bg-white p-6 h-full border-t-4 border-[#4A6741]">
                <h3 className="font-bold text-[#4A6741] text-xs tracking-widest uppercase mb-4">Permitted By Right</h3>
                <ul className="space-y-2">
                  {[
                    "Multi-family dwellings",
                    "Townhouses",
                    "Cluster housing",
                    "Group dwellings (senior living)",
                    "Two-family dwellings",
                    "One-family dwellings",
                    "Publicly owned/operated uses",
                    "Timesharing facility",
                  ].map(use => (
                    <li key={use} className="flex items-start gap-2 text-sm text-[#2C2C2C]/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4A6741] mt-1.5 shrink-0" />
                      {use}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            {/* Conditional Uses */}
            <SectionReveal>
              <div className="bg-white p-6 h-full border-t-4 border-[#CB521E]">
                <h3 className="font-bold text-[#CB521E] text-xs tracking-widest uppercase mb-4">Conditional Uses</h3>
                <ul className="space-y-2 mb-6">
                  {[
                    "Church / Place of Worship (fronts arterial ✓)",
                    "Private child care / pre-school",
                    "Public utility substation",
                    "Industrialized dwelling",
                  ].map(use => (
                    <li key={use} className="flex items-start gap-2 text-sm text-[#2C2C2C]/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#CB521E] mt-1.5 shrink-0" />
                      {use}
                    </li>
                  ))}
                </ul>
                <div className="bg-[#F8F5F0] p-3 text-xs text-[#2C2C2C]/70 leading-relaxed">
                  Conditional uses require Board of Commissioners approval per Section 904 of the Glynn County Zoning Ordinance.
                </div>
              </div>
            </SectionReveal>

            {/* Development Standards */}
            <SectionReveal>
              <div className="bg-white p-6 h-full border-t-4 border-[#C9A84C]">
                <h3 className="font-bold text-[#C9A84C] text-xs tracking-widest uppercase mb-4">Development Standards</h3>
                <div className="space-y-3">
                  {[
                    ["Max Density", "16 units / net acre"],
                    ["Max Height", "45 feet (~3–4 stories)"],
                    ["By-Right Yield", "120–136 units"],
                    ["Min Lot (MF)", "8,000 SF"],
                    ["Front Setback (MF)", "30 ft"],
                    ["Side/Rear Setback", "15 ft"],
                    ["Min Lot Width (MF)", "80 ft"],
                    ["Townhouse Lot Min", "2,000 SF / unit"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center border-b border-[#E8E0D0] pb-2 last:border-b-0">
                      <span className="text-xs text-[#2C2C2C]/60">{label}</span>
                      <span className="text-xs font-bold text-[#2C2C2C]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Rezoning potential callout */}
          <SectionReveal>
            <div className="mt-12 bg-[#2C2C2C] text-white p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="shrink-0">
                <TrendingUp size={36} className="text-[#CB521E]" />
              </div>
              <div>
                <h3 className="font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem" }}>
                  Rezoning Potential — The Path to Maximum Value
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  The property's position on Scranton Connector (a designated arterial) and proximity to commercial nodes creates a compelling case for rezoning to OC (Office Commercial), GC (General Commercial), MED (Medical), or PD (Planned Development). A rezoning can increase the sale price by <strong className="text-[#CB521E]">$1.5M to $3.5M</strong> above the residential-only scenario.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["OC — Office Commercial", "GC — General Commercial", "MED — Medical District", "PD — Planned Development", "HC — Highway Commercial"].map(z => (
                    <span key={z} className="text-xs px-3 py-1 border border-white/20 text-white/70">{z}</span>
                  ))}
                </div>
                <p className="text-white/50 text-xs mt-4">
                  Note: Glynn County is currently undergoing a comprehensive Zoning Ordinance rewrite (early 2026), creating a window to advocate for a more flexible designation.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── MARKET ANALYSIS ── */}
      <section id="market" className="py-24 bg-white">
        <div className="container">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="section-accent-bar" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#4A6741] font-bold">Market Analysis</span>
            </div>
            <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#2C2C2C" }}>
              Glynn County: A Market in Motion
            </h2>
            <p className="text-[#2C2C2C]/70 max-w-2xl mb-16 text-base leading-relaxed">
              Brunswick and Glynn County are experiencing a period of sustained economic expansion driven by port-related industrial growth, tourism, healthcare expansion, and a significant housing supply deficit.
            </p>
          </SectionReveal>

          {/* Key economic stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { value: 5780, suffix: "M", prefix: "$", label: "Glynn County GDP (2023)", sub: "9.5% nominal growth" },
              { value: 9545, suffix: "", prefix: "", label: "Housing Units Needed", sub: "7th highest shortage in GA" },
              { value: 477, suffix: "", prefix: "+", label: "New Businesses (2021–24)", sub: "2,803 → 3,280 establishments" },
              { value: 100, suffix: "M+", prefix: "$", label: "New Investment at Exit 42", sub: "2024–2025 alone" },
            ].map(({ value, suffix, prefix, label, sub }) => (
              <SectionReveal key={label}>
                <div className="stat-card p-6 h-full">
                  <div className="text-3xl font-bold text-[#CB521E] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem" }}>
                    <AnimatedStat value={value} suffix={suffix} prefix={prefix} />
                  </div>
                  <div className="text-xs font-bold text-[#2C2C2C] uppercase tracking-wide mb-1">{label}</div>
                  <div className="text-xs text-[#2C2C2C]/50">{sub}</div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Two-column: Growth story + Image */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <SectionReveal>
              <div>
                <h3 className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 600 }}>
                  The Exit 42 / North Mainland Growth Corridor
                </h3>
                <p className="text-[#2C2C2C]/70 text-sm leading-relaxed mb-6">
                  The most significant near-term growth vector in Glynn County is the Exit 42 / North Mainland corridor along I-95, approximately 3–5 miles north of the subject property. This corridor has seen over $100 million in new capital investment in 2024–2025 alone.
                </p>
                <div className="space-y-3">
                  {[
                    { name: "Buc-ee's Travel Center", detail: "Opened Q2 2025 at Exit 42 — major regional traffic generator" },
                    { name: "Hillpointe Distribution Center", detail: "500,000 SF, $40M investment, groundbreaking 2024–2025" },
                    { name: "JB2 Manufacturing Facility", detail: "60,000 SF manufacturing plant, currently under development" },
                    { name: "Georgia Breakbulk Logistics Park", detail: "1,500-acre, GRAD-certified, rail-served industrial site at Exit 29" },
                    { name: "Scranton Connector Sidewalk Project", detail: "Active public infrastructure investment — bids opened March 4, 2026" },
                  ].map(({ name, detail }) => (
                    <div key={name} className="flex gap-3 p-3 bg-[#F8F5F0] border-l-2 border-[#4A6741]">
                      <div>
                        <div className="text-sm font-bold text-[#2C2C2C]">{name}</div>
                        <div className="text-xs text-[#2C2C2C]/60 mt-0.5">{detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
            <SectionReveal>
              <div className="relative">
                <img
                  src={BRUNSWICK_IMAGE}
                  alt="Brunswick, Georgia and the Golden Isles — Sidney Lanier Bridge aerial"
                  className="w-full object-cover"
                  style={{ height: "420px" }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="text-white text-sm font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic" }}>
                    Brunswick, Georgia &amp; the Golden Isles — Sidney Lanier Bridge
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Housing shortage callout */}
          <SectionReveal>
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
                <img src={MARSH_IMAGE} alt="Golden Isles coastal Georgia marsh" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#4A6741]/60" />
                <div className="relative p-10 h-full flex flex-col justify-center">
                  <div className="text-white/70 text-xs tracking-widest uppercase mb-3">The Housing Imperative</div>
                  <div className="text-white font-bold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", lineHeight: 1 }}>
                    9,545
                  </div>
                  <div className="text-white text-base mb-4">additional housing units needed in Glynn County</div>
                  <div className="text-white/70 text-sm">Ranked 7th highest housing shortage in Georgia — Georgia Public Policy Foundation, July 2025</div>
                </div>
              </div>
              <div className="bg-[#2C2C2C] p-10 flex flex-col justify-center">
                <h3 className="text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 400 }}>
                  Supply/Demand Imbalance Creates Compelling Investment Thesis
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  Glynn County's population growth — driven by retirees, tourism workers, port employees, and healthcare professionals — is expected to continue. The documented housing shortage creates immediate demand for any residential developer acquiring this site.
                </p>
                <ul className="space-y-2">
                  {[
                    "Median household income grew +20% from 2020 to 2023",
                    "170-unit rental community received financing approval Feb. 2026",
                    "Glynn County launched formal Housing Survey in Oct. 2025",
                    "Average annual wage growth of +2.7% over preceding four quarters",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#CB521E] mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── DEVELOPMENT CONCEPT ── */}
      <section className="relative py-0 overflow-hidden" style={{ minHeight: "500px" }}>
        <img src={CONCEPT_IMAGE} alt="Development concept rendering for 144 Scranton Connector" className="w-full object-cover" style={{ height: "500px" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center container">
          <SectionReveal className="max-w-xl">
            <div className="text-[#CB521E] text-xs tracking-widest uppercase font-bold mb-4">Development Potential</div>
            <h2 className="text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300 }}>
              Imagine What's<br /><span style={{ fontWeight: 700 }}>Possible Here</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              A 10-acre site with arterial frontage, full utilities, and by-right density for 120–136 residential units — or the canvas for a medical campus, senior living community, or mixed-use development following rezoning.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Multifamily Community", "Senior Living", "Medical Campus", "Charter School", "Mixed-Use PD", "Church Campus"].map(use => (
                <span key={use} className="text-xs px-3 py-1.5 border border-white/30 text-white/80 hover:border-[#CB521E] hover:text-white transition-colors">{use}</span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── BUYER TARGETS ── */}
      <section id="buyers" className="py-24 bg-white">
        <div className="container">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="section-accent-bar" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#4A6741] font-bold">Target Buyer Analysis</span>
            </div>
            <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#2C2C2C" }}>
              Who Should Own This Property?
            </h2>
            <p className="text-[#2C2C2C]/70 max-w-2xl mb-16 text-base leading-relaxed">
              A dual-track marketing strategy — simultaneously targeting residential developers under current zoning while pursuing rezoning discussions with commercial, medical, and government buyers — maximizes competitive tension and achieves the highest possible sale price.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                tier: "Tier 1",
                icon: Building2,
                title: "Multifamily Developer",
                subtitle: "Workforce / Market Rate",
                range: "$2.4M – $3.8M",
                color: "#CB521E",
                why: "By-right MR zoning permits 120–136 units immediately. Documented 9,545-unit housing shortage creates strong demand fundamentals.",
                targets: ["Regional multifamily developers", "LIHTC syndicators", "Build-to-rent operators"],
              },
              {
                tier: "Tier 1",
                icon: Activity,
                title: "Medical / Healthcare",
                subtitle: "Health System or REIT",
                range: "$4.5M – $8.0M",
                color: "#CB521E",
                why: "10-acre site on arterial with full utilities is ideal for medical office park, outpatient surgery center, or specialty clinic campus.",
                targets: ["SE Georgia Health System", "HCA / Tenet Healthcare", "Healthcare REITs"],
              },
              {
                tier: "Tier 2",
                icon: Landmark,
                title: "Charter / Private School",
                subtitle: "K-12 Education",
                range: "$2.5M – $4.5M",
                color: "#4A6741",
                why: "Existing gymnasium, pool, and athletic fields reduce construction cost. Large site in residential neighborhood context.",
                targets: ["KIPP, Academica, Charter Schools USA", "Local private school boards"],
              },
              {
                tier: "Tier 2",
                icon: Users,
                title: "Senior Living Developer",
                subtitle: "Assisted / Independent Living",
                range: "$3.0M – $5.5M",
                color: "#4A6741",
                why: "Group dwellings permitted by right in MR district. Senior living is one of the most active development categories in coastal Georgia.",
                targets: ["Sunrise, Brookdale, Atria", "Regional senior living developers"],
              },
              {
                tier: "Tier 2",
                icon: HomeIcon,
                title: "Church / Religious Inst.",
                subtitle: "Multi-Campus Organization",
                range: "$2.0M – $3.5M",
                color: "#4A6741",
                why: "Existing gymnasium, fellowship spaces, and outdoor areas are directly compatible. Conditional use approval routinely granted on arterials.",
                targets: ["Large regional churches", "Multi-campus megachurch networks"],
              },
              {
                tier: "Tier 3",
                icon: MapPin,
                title: "Government / Institutional",
                subtitle: "County, City, or State Agency",
                range: "$2.5M – $4.5M",
                color: "#C9A84C",
                why: "Government entities are motivated buyers when large institutional sites become available. Potential uses: community center, public health clinic, government campus.",
                targets: ["Glynn County BOC", "City of Brunswick", "State agencies (DCA, GEFA)"],
              },
            ].map(({ tier, icon: Icon, title, subtitle, range, color, why, targets }) => (
              <SectionReveal key={title}>
                <div className="border border-[#E8E0D0] p-6 h-full hover:shadow-lg transition-shadow bg-white group">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs tracking-widest uppercase font-bold" style={{ color }}>{tier}</span>
                      <h3 className="font-bold text-[#2C2C2C] mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}>{title}</h3>
                      <div className="text-xs text-[#2C2C2C]/50 mt-0.5">{subtitle}</div>
                    </div>
                    <div className="p-2 rounded-none" style={{ background: `${color}15` }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                  </div>
                  <div className="text-xl font-bold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color }}>
                    {range}
                  </div>
                  <p className="text-xs text-[#2C2C2C]/70 leading-relaxed mb-4">{why}</p>
                  <div className="border-t border-[#E8E0D0] pt-3">
                    <div className="text-xs text-[#2C2C2C]/40 uppercase tracking-wide mb-2">Target Contacts</div>
                    {targets.map(t => (
                      <div key={t} className="text-xs text-[#2C2C2C]/60 flex items-center gap-1.5 mb-1">
                        <div className="w-1 h-1 rounded-full bg-[#4A6741]" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP / LOCATION ── */}
      <section id="map" className="py-24 section-warm-stone">
        <div className="container">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="section-accent-bar" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#4A6741] font-bold">Location & Context</span>
            </div>
            <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#2C2C2C" }}>
              Positioned at the Center of Glynn County's Growth
            </h2>
            <p className="text-[#2C2C2C]/70 max-w-2xl mb-12 text-base leading-relaxed">
              144 Scranton Connector sits along a major arterial corridor with direct access to I-95, the Brunswick commercial core, and the Golden Isles' employment, healthcare, and tourism base.
            </p>
          </SectionReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SectionReveal>
                <div className="w-full overflow-hidden border border-[#E8E0D0]" style={{ height: "480px" }}>
                  <MapView
                    onMapReady={(map: google.maps.Map) => {
                      const center = { lat: 31.2194, lng: -81.4852 };
                      map.setCenter(center);
                      map.setZoom(14);
                      map.setMapTypeId("hybrid");

                      // Main property marker
                      const marker = new google.maps.Marker({
                        position: center,
                        map,
                        title: "144 Scranton Connector — YMCA Property",
                        icon: {
                          path: google.maps.SymbolPath.CIRCLE,
                          scale: 14,
                          fillColor: "#CB521E",
                          fillOpacity: 1,
                          strokeColor: "#ffffff",
                          strokeWeight: 3,
                        },
                      });

                      const infoWindow = new google.maps.InfoWindow({
                        content: `<div style="font-family:'Lato',sans-serif;padding:8px;max-width:220px">
                          <div style="font-weight:700;color:#CB521E;font-size:13px;margin-bottom:4px">144 Scranton Connector</div>
                          <div style="font-size:12px;color:#555">Brunswick, GA 31525</div>
                          <div style="font-size:11px;color:#888;margin-top:4px">±10 Acres | MR Zoning | PARID: 03-10768</div>
                        </div>`,
                      });

                      marker.addListener("click", () => infoWindow.open(map, marker));
                      infoWindow.open(map, marker);

                      // Nearby POIs
                      const pois = [
                        { lat: 31.2490, lng: -81.4920, label: "Exit 42 / Buc-ee's", color: "#4A6741" },
                        { lat: 31.1500, lng: -81.4900, label: "Downtown Brunswick", color: "#4A6741" },
                        { lat: 31.2100, lng: -81.4600, label: "SE GA Health System", color: "#4A6741" },
                        { lat: 31.1800, lng: -81.3900, label: "St. Simons Island", color: "#4A6741" },
                      ];

                      pois.forEach(poi => {
                        new google.maps.Marker({
                          position: { lat: poi.lat, lng: poi.lng },
                          map,
                          title: poi.label,
                          icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: poi.color,
                            fillOpacity: 0.85,
                            strokeColor: "#ffffff",
                            strokeWeight: 2,
                          },
                          label: {
                            text: poi.label,
                            color: "#ffffff",
                            fontSize: "10px",
                            fontWeight: "bold",
                          },
                        });
                      });
                    }}
                  />
                </div>
              </SectionReveal>
            </div>

            <SectionReveal>
              <div className="space-y-4">
                <h3 className="font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}>
                  Key Proximity Points
                </h3>
                {[
                  { place: "I-95 / Exit 38", dist: "~2 miles", note: "Primary interstate access" },
                  { place: "Exit 42 (Buc-ee's / Industrial)", dist: "~4 miles N", note: "Major growth corridor" },
                  { place: "SE Georgia Health System", dist: "~3 miles", note: "Regional medical center" },
                  { place: "Downtown Brunswick", dist: "~3 miles S", note: "Historic commercial core" },
                  { place: "Brunswick Golden Isles Airport", dist: "~6 miles", note: "Regional air access" },
                  { place: "St. Simons Island", dist: "~8 miles", note: "Tourism & retail hub" },
                  { place: "Jekyll Island", dist: "~12 miles", note: "State park & resort" },
                  { place: "Golden Isles Elementary", dist: "~2.3 miles", note: "Rated 8/10" },
                  { place: "Brunswick High School", dist: "~2.4 miles", note: "Rated 7/10" },
                ].map(({ place, dist, note }) => (
                  <div key={place} className="flex items-start gap-3 p-3 bg-white border border-[#E8E0D0]">
                    <MapPin size={14} className="text-[#CB521E] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-[#2C2C2C]">{place}</div>
                      <div className="text-xs text-[#2C2C2C]/50">{dist} · {note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── HISTORY / YMCA STORY ── */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="section-accent-bar" />
                  <span className="text-xs tracking-[0.2em] uppercase text-[#4A6741] font-bold">Property History</span>
                </div>
                <h2 className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 600, color: "#2C2C2C" }}>
                  Decades of Community Service.<br />
                  <span style={{ fontWeight: 300, fontStyle: "italic" }}>A New Chapter Begins.</span>
                </h2>
                <p className="text-[#2C2C2C]/70 text-sm leading-relaxed mb-4">
                  The Golden Isles YMCA has served the Brunswick community for decades from this Scranton Connector location, providing fitness, aquatics, youth programming, and community gathering space to generations of Glynn County residents. The facility's gymnasium, indoor and outdoor pools, and athletic fields have been central to the community's recreational life.
                </p>
                <p className="text-[#2C2C2C]/70 text-sm leading-relaxed mb-4">
                  The YMCA of Coastal Georgia has made the strategic decision to close this location and invest in a new, modern facility better suited to contemporary programming needs. The organization publicly acknowledged the need for a replacement facility and has been engaged in fundraising for a new location. This transition — driven by the organization's forward momentum, not financial distress — creates a rare market opportunity.
                </p>
                <p className="text-[#2C2C2C]/70 text-sm leading-relaxed">
                  The property was last sold in December 2011 for $698,112. Today, with the growth of the Glynn County market, the documented housing shortage, and the corridor's public infrastructure investment, the site commands a substantially higher value as a redevelopment opportunity.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal>
              <div className="space-y-4">
                <div className="relative overflow-hidden" style={{ height: "280px" }}>
                  <img src={HERO_IMAGE} alt="Aerial view of YMCA property" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white text-sm font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                    144 Scranton Connector — Aerial View
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Year Built", value: "1970s–90s" },
                    { label: "Site Area", value: "10.0 Acres" },
                    { label: "Assessed (2025)", value: "$982,400" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#F8F5F0] p-4 text-center border border-[#E8E0D0]">
                      <div className="text-lg font-bold text-[#CB521E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}>{value}</div>
                      <div className="text-xs text-[#2C2C2C]/50 mt-1 uppercase tracking-wide">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── MARKETING STRATEGY ── */}
      <section className="py-24 section-dark">
        <div className="container">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#CB521E]" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#CB521E] font-bold">Marketing Strategy</span>
            </div>
            <h2 className="mb-4 text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
              A Structured Process to Maximize Value
            </h2>
            <p className="text-white/60 max-w-2xl mb-16 text-base leading-relaxed">
              PIER Commercial Real Estate recommends a competitive bid process — not a private, off-market transaction — to maximize competitive tension and achieve the highest possible sale price.
            </p>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                phase: "Phase 1",
                title: "Pre-Marketing",
                timeline: "Months 1–2",
                items: [
                  "Engage Glynn County planning staff — pre-application rezoning meeting",
                  "Commission Phase I Environmental Site Assessment",
                  "Commission boundary survey / ALTA",
                  "Prepare professional offering memorandum",
                  "Launch offering website",
                ],
              },
              {
                phase: "Phase 2",
                title: "Broad Market Outreach",
                timeline: "Months 2–3",
                items: [
                  "Direct outreach to Tier 1 & 2 buyers",
                  "LoopNet and CoStar premium listing",
                  "CCIM network outreach — GA & Southeast chapters",
                  "Direct mail to SE multifamily / medical / institutional developers",
                  "Press release to Brunswick News, Georgia Trend",
                ],
              },
              {
                phase: "Phase 3",
                title: "Call for Offers & Close",
                timeline: "Months 4–8",
                items: [
                  "Formal offer deadline — creates urgency",
                  "Evaluate all offers on net-to-seller basis",
                  "Negotiate with top 2–3 bidders simultaneously",
                  "Execute PSA with 60–90 day due diligence",
                  "Close transaction",
                ],
              },
            ].map(({ phase, title, timeline, items }) => (
              <SectionReveal key={phase}>
                <div className="bg-white/5 border border-white/10 p-6 h-full">
                  <div className="text-[#CB521E] text-xs tracking-widest uppercase font-bold mb-1">{phase}</div>
                  <h3 className="text-white font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}>{title}</h3>
                  <div className="text-white/40 text-xs mb-5">{timeline}</div>
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CB521E] mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <div className="bg-[#CB521E] p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div>
                <div className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem" }}>
                  Download the Full Offering Memorandum
                </div>
                <p className="text-white/80 text-sm">
                  Complete property analysis, zoning data, market research, buyer targeting strategy, and financial estimates — prepared by PIER Commercial Real Estate.
                </p>
              </div>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-white text-[#CB521E] font-bold text-xs tracking-widest uppercase px-8 py-4 flex items-center gap-2 hover:bg-[#F8F5F0] transition-colors"
              >
                <Download size={16} />
                Download PDF
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CONTACT / INQUIRY ── */}
      <section id="contact" className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <SectionReveal>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="section-accent-bar" />
                  <span className="text-xs tracking-[0.2em] uppercase text-[#4A6741] font-bold">Contact</span>
                </div>
                <h2 className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#2C2C2C" }}>
                  Request Information
                </h2>
                <p className="text-[#2C2C2C]/70 text-sm leading-relaxed mb-10">
                  This offering is presented exclusively by PIER Commercial Real Estate. To request the full offering memorandum, schedule a site tour, or submit an offer, contact Ryan T. Schneider, CCIM directly.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#CB521E] flex items-center justify-center shrink-0">
                      <Phone size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-[#2C2C2C]/40 uppercase tracking-wide mb-0.5">Direct Line</div>
                      <a href="tel:9122396298" className="text-[#2C2C2C] font-bold hover:text-[#CB521E] transition-colors">912-239-6298</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#CB521E] flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-[#2C2C2C]/40 uppercase tracking-wide mb-0.5">Email</div>
                      <a href="mailto:ryan@piercommercial.com" className="text-[#2C2C2C] font-bold hover:text-[#CB521E] transition-colors">ryan@piercommercial.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#CB521E] flex items-center justify-center shrink-0">
                      <Globe size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-[#2C2C2C]/40 uppercase tracking-wide mb-0.5">Website</div>
                      <a href="https://www.piercommercial.com" target="_blank" rel="noopener noreferrer" className="text-[#2C2C2C] font-bold hover:text-[#CB521E] transition-colors flex items-center gap-1">
                        www.piercommercial.com <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-6 bg-[#F8F5F0] border-l-4 border-[#4A6741]">
                  <div className="font-bold text-[#2C2C2C] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>Ryan T. Schneider, CCIM</div>
                  <div className="text-sm text-[#2C2C2C]/60 mb-3">President | PIER Commercial Real Estate</div>
                  <p className="text-xs text-[#2C2C2C]/60 leading-relaxed">
                    PIER Commercial Real Estate covers the Coastal Georgia and Lowcountry SC trade area, specializing in commercial brokerage and property management across retail, office, industrial, medical, land, and investment properties.
                  </p>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal>
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-16 h-16 bg-[#4A6741] flex items-center justify-center mb-6">
                    <Mail size={28} className="text-white" />
                  </div>
                  <h3 className="font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem" }}>
                    Thank You
                  </h3>
                  <p className="text-[#2C2C2C]/60 text-sm max-w-sm">
                    Your inquiry has been received. Ryan Schneider will be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="font-bold text-[#2C2C2C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem" }}>
                    Inquire About This Property
                  </h3>
                  {[
                    { id: "name", label: "Full Name", type: "text", required: true },
                    { id: "company", label: "Company / Organization", type: "text", required: false },
                    { id: "email", label: "Email Address", type: "email", required: true },
                    { id: "phone", label: "Phone Number", type: "tel", required: false },
                  ].map(({ id, label, type, required }) => (
                    <div key={id}>
                      <label className="text-xs font-bold text-[#2C2C2C]/60 uppercase tracking-wide block mb-1.5">{label}{required && " *"}</label>
                      <input
                        type={type}
                        required={required}
                        value={formData[id as keyof typeof formData]}
                        onChange={e => setFormData(prev => ({ ...prev, [id]: e.target.value }))}
                        className="w-full border border-[#E8E0D0] px-4 py-3 text-sm text-[#2C2C2C] bg-white focus:outline-none focus:border-[#CB521E] transition-colors rounded-none"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-bold text-[#2C2C2C]/60 uppercase tracking-wide block mb-1.5">Message / Interest</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Please describe your interest in the property and intended use..."
                      className="w-full border border-[#E8E0D0] px-4 py-3 text-sm text-[#2C2C2C] bg-white focus:outline-none focus:border-[#CB521E] transition-colors rounded-none resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-pier w-full rounded-none justify-center flex items-center gap-2">
                    <Mail size={15} />
                    Submit Inquiry
                  </button>
                  <p className="text-xs text-[#2C2C2C]/40 text-center">
                    Your information is confidential and will only be used to respond to your inquiry.
                  </p>
                </form>
              )}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-[#CB521E]" />
                <div>
                  <div className="font-bold text-sm tracking-widest uppercase">PIER Commercial</div>
                  <div className="text-white/40 text-xs">Real Estate</div>
                </div>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                Coastal Georgia &amp; Lowcountry SC commercial real estate brokerage and property management.
              </p>
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Property</div>
              <div className="text-sm text-white/70 space-y-1">
                <div>144 Scranton Connector</div>
                <div>Brunswick, Georgia 31525</div>
                <div>Glynn County PARID: 03-10768</div>
                <div className="text-white/40 text-xs mt-2">±10.00 Acres | MR Zoning</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Exclusive Listing Broker</div>
              <div className="text-sm text-white/70 space-y-1">
                <div className="font-bold text-white">Ryan T. Schneider, CCIM</div>
                <div>President, PIER Commercial Real Estate</div>
                <a href="tel:9122396298" className="text-[#CB521E] hover:text-white transition-colors block">912-239-6298</a>
                <a href="mailto:ryan@piercommercial.com" className="text-[#CB521E] hover:text-white transition-colors block">ryan@piercommercial.com</a>
                <a href="https://www.piercommercial.com" target="_blank" rel="noopener noreferrer" className="text-[#CB521E] hover:text-white transition-colors flex items-center gap-1 text-xs mt-1">
                  www.piercommercial.com <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs">
              © 2026 PIER Commercial Real Estate. All rights reserved. This offering is subject to prior sale, change, or withdrawal without notice.
            </p>
            <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-[#CB521E] transition-colors flex items-center gap-1.5">
              <FileText size={12} />
              Download Offering Memorandum
            </a>
          </div>
          <p className="text-white/20 text-xs mt-4 text-center max-w-3xl mx-auto">
            This offering memorandum is prepared for informational purposes only. It does not constitute a certified appraisal under USPAP standards. All value estimates are broker's opinions of value. Prospective purchasers should conduct their own due diligence.
          </p>
        </div>
      </footer>
    </div>
  );
}
