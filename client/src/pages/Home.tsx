/*
 * DESIGN PHILOSOPHY: "Golden Isles Prestige"
 * Warm stone + coastal sage + PIER orange
 * Photography-led, layered information architecture
 * Cormorant Garamond headlines + Lato body
 *
 * PUBLIC-FACING BUYER OFFERING VERSION
 * - No pricing / value ranges (contact broker for pricing)
 * - No listing agreement section
 * - No buyer target analysis
 * - Tone: "Here is the opportunity" — not "here is our strategy"
 */

import { useState, useEffect, useRef } from "react";
import { MapPin, Building2, Phone, Mail, Globe, ChevronDown, ExternalLink, Activity, Home as HomeIcon } from "lucide-react";
import { MapView } from "@/components/Map";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_sitemap_cropped_54e1829f.jpg";
const SITE_MAP_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_actual_hero-1_0f2db3f7.jpg";
const BRUNSWICK_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_brunswick_skyline-N9XUvfWWRMUjvnnYG6nm66.webp";
const MARSH_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_coastal_georgia_marsh-X6dYofBJpMKPXANMjhUTHH.webp";
const CONCEPT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/ymca_development_concept-QT2yhbA9b2MDhSebaUEamJ.webp";
const PIER_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663387123891/cZJAjbkh8KR8FWhRaqDtLR/Brokeragetransp_476781a6.png";

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
            <div className="bg-[#1e1e1e]/80 backdrop-blur-sm px-3 py-1.5 rounded">
              <img src={PIER_LOGO} alt="PIER Commercial Real Estate" className="h-8 w-auto" />
            </div>
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
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest text-white px-5 py-2.5 border border-white/40 hover:bg-white/10 transition-all"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            <Mail size={13} /> REQUEST OFFERING INFORMATION
          </button>
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

        <div className="absolute top-24 right-8 text-white/30 text-xs tracking-widest" style={{ fontFamily: "monospace" }}>
          31.2194° N &nbsp;|&nbsp; 81.4852° W
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-start container">
          <div className="max-w-3xl">
            <div className="fade-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#CB521E]" />
                <span className="text-white text-xs tracking-[0.25em] uppercase font-bold">Investment Offering | Brunswick, Georgia</span>
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
              <button onClick={() => scrollTo("contact")} className="btn-pier rounded-none flex items-center gap-2">
                <Mail size={15} />
                Request Offering Information
              </button>
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
                  <div className="text-xs tracking-widest uppercase font-bold mb-2 text-white/70">Broker's Assessment</div>
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

      {/* ── PRICING CALLOUT ── */}
      <section className="py-16 section-dark">
        <div className="container">
          <SectionReveal>
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-[#CB521E]" />
                <span className="text-xs tracking-[0.2em] uppercase text-[#CB521E] font-bold">Pricing</span>
                <div className="h-px w-12 bg-[#CB521E]" />
              </div>
              <h2 className="text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300 }}>
                Pricing Available Upon Request
              </h2>
              <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed mb-8">
                This property is offered for sale at a price to be disclosed to qualified buyers. To receive pricing information and the full offering memorandum, please contact the exclusive listing broker.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-pier rounded-none inline-flex items-center gap-2 text-sm"
              >
                <Mail size={15} />
                Contact Broker for Pricing
              </button>
            </div>
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
                    ["Min Lot Width", "80 ft"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-[#E8E0D0] pb-2 last:border-0">
                      <span className="text-xs text-[#2C2C2C]/60">{k}</span>
                      <span className="text-xs font-bold text-[#2C2C2C]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Rezoning Opportunity */}
          <SectionReveal className="mt-12">
            <div className="bg-[#2C2C2C] text-white p-8 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-[#CB521E] text-xs tracking-widest uppercase font-bold mb-3">Rezoning Upside</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 400 }} className="mb-4">
                  Commercial Rezoning Unlocks Premium Value
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  A rezoning to GC (General Commercial) or OC (Office Commercial) would open the door to medical office, retail, hospitality, or mixed-use development — uses that command significantly higher land values than residential. The site's arterial frontage and proximity to SE Georgia Health System make commercial rezoning a compelling path for the right buyer.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { use: "Medical Office / Health Campus", note: "Arterial access + proximity to SE GA Health System" },
                  { use: "Hospitality / Extended Stay Hotel", note: "High demand corridor near I-95 and tourism base" },
                  { use: "Retail / Mixed-Use Center", note: "Glynn Place Mall adjacency creates retail synergy" },
                  { use: "Government / Institutional Campus", note: "County and state agencies are active buyers" },
                ].map(({ use, note }) => (
                  <div key={use} className="flex gap-3 p-3 bg-white/5 border-l-2 border-[#CB521E]">
                    <div>
                      <div className="text-sm font-bold text-white">{use}</div>
                      <div className="text-xs text-white/50 mt-0.5">{note}</div>
                    </div>
                  </div>
                ))}
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

      {/* ── MARKET OVERVIEW ── */}
      <section id="market" className="py-24 bg-white">
        <div className="container">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="section-accent-bar" />
              <span className="text-xs tracking-[0.2em] uppercase text-[#4A6741] font-bold">Market Overview</span>
            </div>
            <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#2C2C2C" }}>
              Glynn County — A Market in Motion
            </h2>
            <p className="text-[#2C2C2C]/70 max-w-2xl mb-16 text-base leading-relaxed">
              Brunswick and Glynn County are experiencing a period of sustained growth driven by port expansion, tourism, healthcare, and in-migration from higher-cost coastal markets.
            </p>
          </SectionReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { value: 120000, suffix: "+", label: "Glynn County Population", sub: "2024 estimate — growing annually" },
              { value: 9545, suffix: "", label: "Housing Units Needed", sub: "7th highest shortage in Georgia (GPPF, 2025)" },
              { value: 20, suffix: "%", label: "Median HH Income Growth", sub: "2020–2023, Glynn County" },
              { value: 100, suffix: "M+", prefix: "$", label: "New Capital Investment", sub: "Exit 42 corridor, 2024–2025 alone" },
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

      {/* ── PROPERTY HISTORY ── */}
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
                  The Golden Isles YMCA has served the Brunswick community for decades from this Scranton Connector location, providing fitness, aquatics, youth programming, and community gathering space to generations of Glynn County residents.
                </p>
                <p className="text-[#2C2C2C]/70 text-sm leading-relaxed mb-4">
                  The YMCA of Coastal Georgia has made the strategic decision to close this location and invest in a new, modern facility better suited to contemporary programming needs. This transition — driven by the organization's forward momentum, not financial distress — creates a rare market opportunity.
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
                    { label: "Last Sale", value: "$698K (2011)" },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-4 bg-[#F8F5F0] border border-[#E8E0D0]">
                      <div className="text-[#CB521E] font-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>{value}</div>
                      <div className="text-xs text-[#2C2C2C]/50 uppercase tracking-wide">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
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
                  This offering is presented exclusively by PIER Commercial Real Estate. To receive pricing, request property information, schedule a site tour, or submit an offer, contact Ryan T. Schneider, CCIM directly.
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
                  <div className="text-xs tracking-widest uppercase font-bold text-[#4A6741] mb-2">Exclusive Listing Broker</div>
                  <div className="font-bold text-[#2C2C2C]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>Ryan T. Schneider, CCIM</div>
                  <div className="text-sm text-[#2C2C2C]/60 mt-1">President, PIER Commercial Real Estate</div>
                  <div className="text-xs text-[#2C2C2C]/40 mt-1">GA Broker Office H-64838 · License #157331</div>
                </div>

                <div className="mt-6 border-t border-[#E8E0D0] pt-5">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="flex items-center gap-2 text-sm font-bold text-[#CB521E] hover:text-[#b44518] transition-colors"
                  >
                    <Mail size={16} />
                    Request Offering Information
                  </button>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal>
              <div className="bg-[#F8F5F0] p-8">
                <h3 className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "#2C2C2C" }}>
                  Send an Inquiry
                </h3>
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#4A6741] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-[#2C2C2C] font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}>Inquiry Received</h4>
                    <p className="text-[#2C2C2C]/60 text-sm">Ryan Schneider will be in touch within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {[
                      { id: "name", label: "Full Name *", type: "text", required: true },
                      { id: "company", label: "Company / Organization", type: "text", required: false },
                      { id: "email", label: "Email Address *", type: "email", required: true },
                      { id: "phone", label: "Phone Number", type: "tel", required: false },
                    ].map(({ id, label, type, required }) => (
                      <div key={id}>
                        <label className="block text-xs font-bold tracking-widest uppercase text-[#2C2C2C]/60 mb-1">{label}</label>
                        <input
                          type={type}
                          required={required}
                          value={formData[id as keyof typeof formData]}
                          onChange={e => setFormData(prev => ({ ...prev, [id]: e.target.value }))}
                          className="w-full px-4 py-3 border border-[#E8E0D0] bg-white text-[#2C2C2C] text-sm focus:outline-none focus:border-[#CB521E] transition-colors"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-[#2C2C2C]/60 mb-1">Message / Interest</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your interest in this property, intended use, timeline, and any questions."
                        className="w-full px-4 py-3 border border-[#E8E0D0] bg-white text-[#2C2C2C] text-sm focus:outline-none focus:border-[#CB521E] transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full btn-pier rounded-none py-4 text-sm font-bold tracking-widest uppercase"
                    >
                      Submit Inquiry
                    </button>
                    <p className="text-xs text-[#2C2C2C]/40 text-center">
                      Your information is kept strictly confidential.
                    </p>
                  </form>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img src={PIER_LOGO} alt="PIER Commercial Real Estate" className="h-12 w-auto" />
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
            <button onClick={() => scrollTo("contact")} className="text-xs text-white/40 hover:text-[#CB521E] transition-colors flex items-center gap-1.5">
              <Mail size={12} />
              Request Offering Information
            </button>
          </div>
          <p className="text-white/20 text-xs mt-4 text-center max-w-3xl mx-auto">
            This offering is prepared for informational purposes only and is subject to prior sale, change, or withdrawal without notice. Prospective purchasers should conduct their own independent due diligence.
          </p>
        </div>
      </footer>
    </div>
  );
}
