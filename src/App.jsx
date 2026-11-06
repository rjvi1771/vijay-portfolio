import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const STATS = [
  { value: "2+", label: "Years Experience" },
  { value: "9", label: "Projects Shipped" },
  { value: "54", label: "Automated Tests" },
  { value: "1", label: "Full-Stack App Deployed" },
];

const SKILLS = [
  { icon: "⌨️", title: "Languages & Markup", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "SCSS"] },
  { icon: "⚛️", title: "Frameworks & Libraries", items: ["React", "TypeScript", "Vue.js", "Tailwind CSS", "Bootstrap"] },
  { icon: "🖥️", title: "Backend & Data", items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Supabase"] },
  { icon: "🧩", title: "CMS & Theming", items: ["WordPress", "Custom Theme Dev", "ACF", "Plugin Customization"] },
  { icon: "📐", title: "Layout & Styling", items: ["CSS Flexbox", "CSS Grid", "Responsive Design", "Mobile-First"] },
  { icon: "🛠️", title: "Tools & Workflow", items: ["Git", "GitHub", "GitHub Actions", "Vitest & Supertest", "Vercel / Render", "Chrome DevTools"] },
  { icon: "🗄️", title: "Other", items: ["MySQL (Basic)", "Cross-browser Compat", "Performance Opt."] },
];

const EXPERIENCE = [
  {
    company: "Zamstars Management Services Pvt. Ltd",
    period: "Apr 2024 – Present · 2+ years",
    role: "Associate Web Developer",
    tag: "Live Projects · WordPress · Vue.js",
    bullets: [
      "Developed and maintained responsive websites for clients including IIHS, Bluspring and Zamstars.",
      "Built and updated web pages, handled content changes, image updates, layout fixes, and UI improvements.",
      "Implemented responsive designs for desktop, tablet, and mobile using mobile-first principles.",
      "Customized WordPress websites using custom themes, plugins, and Advanced Custom Fields (ACF).",
      "Worked on navigation updates, submenu development, and active state highlighting.",
      "Improved website performance and ensured cross-browser compatibility.",
      "Gained hands-on React experience — built login/sign-up flows and a basic admin dashboard (ZPod).",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Vue.js", "WordPress", "ACF", "Git"],
  },
];

const PROJECTS = [
  {
    icon: "🌾",
    category: "React · TypeScript · Full-Stack",
    title: "Agri Price Tracker — Mandi & Weather Platform",
    desc: "Built and deployed a full-stack web app that tracks mandi (wholesale market) crop prices and weather forecasts. Designed a scheduled data pipeline with GitHub Actions and idempotent PostgreSQL upserts to ensure the app reads from its own database and stays available when the upstream API is slow or down. Solved data-integrity bugs (variety-based pricing, accurate averages, IST date grouping) with 54 automated tests.",
    url: "https://agri-price-tracker-three.vercel.app",
    repo: "https://github.com/rjvi1771/agri-price-tracker",
    role: "Full-stack architecture, React + Recharts UI, GitHub Actions cron pipeline, PostgreSQL/Supabase schema & upserts, 54 Vitest/Supertest test suite",
    stats: [{ v: "54", l: "Automated Tests" }, { v: "Full-Stack", l: "React · Node" }, { v: "PostgreSQL", l: "Supabase DB" }],
    tech: ["React", "TypeScript", "Vite", "Recharts", "Node.js", "Express", "PostgreSQL", "Supabase", "GitHub Actions", "Vitest", "Supertest", "Vercel", "Render"],
  },
  {
    icon: "🏭",
    category: "Vue.js · SaaS Platform · Industrial",
    title: "InduzBuy — Industrial Procurement Platform",
    desc: "Built frontend features for InduzBuy, India's #1 industrial procurement orchestration SaaS platform. Used Vue.js to develop interactive UI components, dynamic data views, and responsive layouts for a complex B2B platform serving both buyers and brands with AI-powered procurement workflows.",
    url: "https://www.induzbuy.com/",
    role: "Vue.js component development, interactive UI, responsive layouts, SaaS frontend features",
    stats: [{ v: "Vue.js", l: "Framework" }, { v: "SaaS", l: "Platform" }, { v: "B2B", l: "Product" }],
    tech: ["Vue.js", "JavaScript", "HTML", "CSS", "Responsive Design", "Component Architecture"],
  },
  {
    icon: "⭐",
    category: "WordPress · Custom Theme · Revamp",
    title: "Zamstars — Company Website",
    desc: "Revamped the full corporate website for Zamstars Management Services — the company I work at. Rebuilt pages with a custom WordPress theme, improved navigation with submenu development, active state highlighting, and a fully responsive mobile-first layout.",
    url: "https://www.zamstars.com/",
    role: "Full revamp — custom theme, navigation, responsive layout, content structure",
    stats: [{ v: "Full", l: "Site Revamp" }, { v: "Custom", l: "Theme Dev" }, { v: "Mobile", l: "First" }],
    tech: ["WordPress", "Custom Theme", "ACF", "HTML", "CSS", "JavaScript", "Responsive Design"],
  },
  {
    icon: "🏛️",
    category: "WordPress · ACF · Custom Post Types",
    title: "IIHS — University Website",
    desc: "Worked on the institutional website for IIHS, a Deemed-to-be University. Content-heavy project with Advanced Custom Fields (ACF), multiple custom post types for programmes, faculty, research, and events — with strict responsive and accessibility requirements.",
    url: "https://www.iihs.ac.in/",
    role: "ACF implementation, custom post types, page building, responsiveness",
    stats: [{ v: "ACF", l: "Heavy Usage" }, { v: "CPT", l: "Custom Post Types" }, { v: "Large", l: "Content Scale" }],
    tech: ["WordPress", "ACF", "Custom Post Types", "Elementor", "HTML", "CSS", "JavaScript", "Responsive"],
  },
  {
    icon: "🌿",
    category: "WordPress · Elementor · Enterprise",
    title: "Bluspring — Parent Company Portal",
    desc: "Developed pages for Bluspring, India's leading tech-enabled integrated infrastructure enterprise. Built with Elementor and custom WordPress components — managing a large multi-section site with complex navigation and sub-brand structure.",
    url: "https://www.bluspring.com/",
    role: "Page development, layout builds, navigation, content updates",
    stats: [{ v: "Enterprise", l: "Scale" }, { v: "Multi", l: "Sub-brand" }, { v: "Elementor", l: "Builder" }],
    tech: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript", "ACF", "Responsive Design"],
  },
  {
    icon: "🤖",
    category: "WordPress · Elementor · AI Brand",
    title: "Aivontis — AI Enterprise Platform",
    desc: "Built pages for Aivontis, an enterprise AI company. The site required a modern, tech-forward design aesthetic with animated sections, custom layouts, and clean typography — all delivered within the WordPress + Elementor stack.",
    url: "https://www.aivontis.ai/",
    role: "Page building, custom sections, responsive layout, UI polish",
    stats: [{ v: "Modern", l: "UI Design" }, { v: "AI", l: "Brand Aesthetic" }, { v: "Animated", l: "Sections" }],
    tech: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript", "Responsive Design"],
  },
  {
    icon: "📡",
    category: "WordPress · Elementor · Telecom",
    title: "Vedang Cellular — Telecom Integrator",
    desc: "Contributed to the website for Vedang, a telecom and enterprise system integrator covering IoT, solar, and surveillance solutions. Handled layout pages, responsive fixes, and content updates across multiple service sections.",
    url: "https://www.vedangcellular.com/",
    role: "Layout pages, responsive fixes, service section content",
    stats: [{ v: "Multi", l: "Service Sections" }, { v: "Cross", l: "Browser Tested" }, { v: "Mobile", l: "Optimised" }],
    tech: ["WordPress", "Elementor", "HTML", "CSS", "Responsive Design", "Cross-browser"],
  },
  {
    icon: "🛡️",
    category: "WordPress · Elementor · Security",
    title: "Terrier — Security Solutions",
    desc: "Worked on the website for Terrier, a national security services company covering 2,800+ sites across India. Built and maintained service pages, ensured mobile responsiveness, and handled ongoing content and layout updates.",
    url: "https://www.terrier.co.in/",
    role: "Service pages, layout maintenance, responsiveness, bug fixes",
    stats: [{ v: "Service", l: "Pages Built" }, { v: "Multi", l: "Page Sections" }, { v: "Live", l: "Production" }],
    tech: ["WordPress", "Elementor", "HTML", "CSS", "JavaScript", "Responsive Design"],
  },
  {
    icon: "⚙️",
    category: "WordPress · Elementor · Industrial",
    title: "Hofincons — Engineering Asset Management",
    desc: "Contributed to the website for Hofincons, an industrial engineering firm specialising in operations and asset management. Delivered responsive page builds and UI improvements across a technically detailed, content-rich website.",
    url: "https://www.hofincons.com/",
    role: "Page builds, UI improvements, responsiveness, content updates",
    stats: [{ v: "Industrial", l: "Domain" }, { v: "Complex", l: "Content Structure" }, { v: "Responsive", l: "All Devices" }],
    tech: ["WordPress", "Elementor", "HTML", "CSS", "ACF", "Responsive Design"],
  },
];

const EDUCATION = {
  degree: "Bachelor of Engineering — Computer Science & Engineering",
  college: "SJC Institute of Technology, Chikkaballapur (VTU)",
  location: "Karnataka, India",
  period: "2019 – 2023",
  cgpa: "CGPA: 7.96 / 10",
  subjects: ["Data Structures", "Algorithms", "DBMS", "Software Engineering", "Web Technologies"],
};

// ─── UTILS ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── FAVICON (VJ logo as SVG data URL) ───────────────────────────────────────
function useFavicon() {
  useEffect(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="12" fill="#0a0a0a"/>
      <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle"
        font-family="Georgia, serif" font-weight="900" font-size="28" fill="#e2ff5d"
        font-style="italic">VJ.</text>
    </svg>`;
    const url = "data:image/svg+xml," + encodeURIComponent(svg);
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = url;
  }, []);
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  // close menu on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || open ? "rgba(10,10,10,0.96)" : "transparent",
      backdropFilter: scrolled || open ? "blur(12px)" : "none",
      borderBottom: scrolled || open ? "1px solid rgba(255,255,255,0.07)" : "none",
      transition: "all 0.3s ease",
      padding: "0 1.25rem",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span onClick={() => go("hero")} style={{ cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#e2ff5d", letterSpacing: "-0.5px" }}>VJ.</span>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === l.toLowerCase() ? "#e2ff5d" : "rgba(255,255,255,0.6)",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
              padding: "6px 10px", borderRadius: 6, transition: "color 0.2s",
            }}>{l}</button>
          ))}
          <button onClick={() => go("contact")} style={{
            marginLeft: 8, padding: "8px 18px", background: "#e2ff5d", color: "#0a0a0a",
            borderRadius: 8, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >Hire Me</button>
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          padding: 8, flexDirection: "column", gap: 5,
        }}>
          <span style={{ display: "block", width: 22, height: 2, background: open ? "#e2ff5d" : "rgba(255,255,255,0.8)", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: open ? "#e2ff5d" : "rgba(255,255,255,0.8)", borderRadius: 2, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 2, background: open ? "#e2ff5d" : "rgba(255,255,255,0.8)", borderRadius: 2, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          padding: "1rem 1.25rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l)} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              color: active === l.toLowerCase() ? "#e2ff5d" : "rgba(255,255,255,0.7)",
              fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500,
              padding: "10px 8px", borderRadius: 6, transition: "color 0.2s",
            }}>{l}</button>
          ))}
          <button onClick={() => go("contact")} style={{
            marginTop: 8, padding: "12px", background: "#e2ff5d", color: "#0a0a0a",
            borderRadius: 8, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>Hire Me</button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [ref, vis] = useInView(0.1);
  return (
    <section id="hero" ref={ref} style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "80px 1.25rem 2rem", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(226,255,93,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(226,255,93,0.04) 1px,transparent 1px)", backgroundSize: "60px 60px", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "20%", left: "5%", width: 300, height: 300, background: "radial-gradient(circle,rgba(226,255,93,0.08) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(226,255,93,0.1)", border: "1px solid rgba(226,255,93,0.25)",
          borderRadius: 20, padding: "6px 14px", marginBottom: 24,
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(12px)",
          transition: "all 0.6s ease",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#e2ff5d", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ color: "#e2ff5d", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Full-Stack Developer · Bengaluru, India</span>
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(2.8rem,8vw,5.5rem)", lineHeight: 1.0,
          color: "#fff", margin: "0 0 16px", letterSpacing: "-2px",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.1s",
        }}>
          Vijay <span style={{ color: "#e2ff5d", fontStyle: "italic" }}>RJ</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.85rem,2vw,1.1rem)",
          color: "rgba(255,255,255,0.55)", maxWidth: 560, lineHeight: 1.7, margin: "0 0 12px",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.2s",
        }}>
          HTML · CSS · JavaScript · TypeScript · React · Node.js · PostgreSQL · Vue.js · WordPress
        </p>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.95rem,2vw,1.15rem)",
          color: "rgba(255,255,255,0.75)", maxWidth: 560, lineHeight: 1.75, margin: "0 0 36px",
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.3s",
        }}>
          I build full-stack web application: React and TypeScript on the front, Node, Express and PostgreSQL behind. <strong style={{ color: "#e2ff5d", fontWeight: 600 }}>2+ years</strong> shipping <strong style={{ color: "#e2ff5d", fontWeight: 600 }}>live production websites</strong> for clients like IIHS and Bluspring.
        </p>

        <div style={{
          display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56,
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)",
          transition: "all 0.7s ease 0.4s",
        }}>
          <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) }} style={{
            padding: "12px 24px", background: "#e2ff5d", color: "#0a0a0a",
            borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15,
            textDecoration: "none", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.target.style.opacity = "0.85"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >Get In Touch</a>
          <a href="https://linkedin.com/in/rj-vijay-a60632217" target="_blank" rel="noreferrer" style={{
            padding: "12px 24px", background: "transparent", color: "rgba(255,255,255,0.8)",
            borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 15,
            textDecoration: "none", transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.target.style.borderColor = "rgba(226,255,93,0.5)"}
            onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
          >LinkedIn</a>
          <a href="https://github.com/rjvi1771" target="_blank" rel="noreferrer" style={{
            padding: "12px 24px", background: "transparent", color: "rgba(255,255,255,0.8)",
            borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 15,
            textDecoration: "none", transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.target.style.borderColor = "rgba(226,255,93,0.5)"}
            onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
          >GitHub</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" style={{
            padding: "12px 24px", background: "transparent", color: "rgba(255,255,255,0.8)",
            borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)",
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 15,
            textDecoration: "none", transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.target.style.borderColor = "rgba(226,255,93,0.5)"}
            onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.2)"}
          >Resume</a>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8,
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28,
          opacity: vis ? 1 : 0, transition: "all 0.7s ease 0.5s",
        }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem,4vw,2rem)", color: "#e2ff5d", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, vis] = useInView();
  return (
    <section id="about" ref={ref} style={{ padding: "80px 1.25rem", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>About</SectionLabel>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", marginBottom: 36, letterSpacing: "-1px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
          Code that <span style={{ color: "#e2ff5d", fontStyle: "italic" }}>looks good</span> and works.
        </h2>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, opacity: vis ? 1 : 0, transition: "all 0.6s ease 0.1s" }}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginBottom: 20 }}>
              I'm a Full-Stack Developer based in Bengaluru with <strong style={{ color: "#fff" }}>2+ years of real production experience</strong> at Zamstars Management Services, where I built and shipped live websites for clients including IIHS and Bluspring.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.85 }}>
              I started with HTML/CSS layouts, Vue.js components and deep WordPress customization (ACF, custom themes). I have since built and deployed a full-stack app, <strong style={{ color: "#e2ff5d" }}>Agri Price Tracker</strong>: a scheduled data pipeline, a TypeScript API, PostgreSQL and a React dashboard, with <strong style={{ color: "#e2ff5d" }}>54 automated tests</strong>.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🎨", title: "UI Development", desc: "Building clean, responsive interfaces from designs — desktop, tablet, and mobile." },
              { icon: "🔧", title: "WordPress", desc: "Custom themes, ACF, plugins, and full site maintenance for live client projects." },
              { icon: "⚡", title: "Performance", desc: "Cross-browser compatibility, optimization, and bug fixing on production sites." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start",
                transition: "border-color 0.2s", cursor: "default",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(226,255,93,0.25)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              >
                <span style={{ fontSize: 18, lineHeight: 1.4 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="meta-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 40, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", opacity: vis ? 1 : 0, transition: "all 0.6s ease 0.2s" }}>
          {[["📍 Location", "Bengaluru, India"], ["🟢 Status", "Open to Work"], ["🎯 Target", "Full-Stack / React Roles"], ["⚡ Available", "Open to opportunities" /* TODO: put real notice period */]].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{k}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [ref, vis] = useInView();
  return (
    <section id="skills" ref={ref} style={{ padding: "80px 1.25rem", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Skills</SectionLabel>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", marginBottom: 36, letterSpacing: "-1px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
          The Tools I <span style={{ color: "#e2ff5d", fontStyle: "italic" }}>Use.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14, opacity: vis ? 1 : 0, transition: "all 0.6s ease 0.1s" }}>
          {SKILLS.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14, padding: "18px 20px",
              transition: "border-color 0.2s,transform 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(226,255,93,0.3)"; e.currentTarget.style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 17 }}>{s.icon}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>{s.title}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.items.map(item => (
                  <span key={item} style={{
                    background: "rgba(226,255,93,0.07)", border: "1px solid rgba(226,255,93,0.15)",
                    borderRadius: 6, padding: "4px 10px",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.65)",
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [ref, vis] = useInView();
  return (
    <section id="experience" ref={ref} style={{ padding: "80px 1.25rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Experience</SectionLabel>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", marginBottom: 36, letterSpacing: "-1px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
          Where I've <span style={{ color: "#e2ff5d", fontStyle: "italic" }}>Worked.</span>
        </h2>
        {EXPERIENCE.map((ex, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: "24px",
            opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease 0.1s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(15px,3vw,20px)", color: "#fff" }}>{ex.company}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{ex.period}</div>
              </div>
              <span style={{
                background: "rgba(226,255,93,0.1)", border: "1px solid rgba(226,255,93,0.2)",
                borderRadius: 20, padding: "4px 12px",
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#e2ff5d", whiteSpace: "nowrap",
              }}>{ex.tag}</span>
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.75)", marginBottom: 16 }}>📌 {ex.role}</div>
            <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              {ex.bullets.map((b, j) => (
                <li key={j} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7, paddingLeft: 16, position: "relative",
                }}>
                  <span style={{ position: "absolute", left: 0, top: "0.55em", width: 5, height: 5, borderRadius: "50%", background: "#e2ff5d", display: "block" }} />
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ex.tech.map(t => (
                <span key={t} style={{
                  background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "4px 10px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [ref, vis] = useInView();
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Full-Stack", "WordPress", "React", "Vue.js"];
  const filtered = filter === "All" ? PROJECTS : filter === "Full-Stack" ? PROJECTS.filter(p => p.category?.toLowerCase().includes("full-stack")) : PROJECTS.filter(p => p.tech.some(t => t.toLowerCase().includes(filter.toLowerCase())));
  return (
    <section id="projects" ref={ref} style={{ padding: "80px 1.25rem", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Projects</SectionLabel>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14, marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", letterSpacing: "-1px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease", margin: 0 }}>
            Things I've <span style={{ color: "#e2ff5d", fontStyle: "italic" }}>Built.</span>
          </h2>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", opacity: vis ? 1 : 0, transition: "all 0.6s ease 0.1s" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "6px 14px", borderRadius: 20, border: "1px solid", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, transition: "all 0.2s",
                background: filter === f ? "#e2ff5d" : "transparent",
                color: filter === f ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                borderColor: filter === f ? "#e2ff5d" : "rgba(255,255,255,0.15)",
              }}>{f}</button>
            ))}
          </div>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 24, opacity: vis ? 1 : 0, transition: "all 0.6s ease 0.15s" }}>
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} · Client work and personal projects
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16, opacity: vis ? 1 : 0, transition: "all 0.6s ease 0.2s" }}>
          {filtered.map((p, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "20px", display: "flex", flexDirection: "column", gap: 12,
              transition: "border-color 0.2s,transform 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(226,255,93,0.3)"; e.currentTarget.style.transform = "translateY(-3px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "none" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 20,
                      background: "rgba(226,255,93,0.08)", border: "1px solid rgba(226,255,93,0.2)",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#e2ff5d",
                      textDecoration: "none", transition: "background 0.2s", whiteSpace: "nowrap",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(226,255,93,0.18)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(226,255,93,0.08)"}
                    >Live Site ↗</a>
                  ) : !p.repo ? (
                    <span style={{ padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Internal</span>
                  ) : null}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" style={{
                      display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 20,
                      background: "rgba(226,255,93,0.08)", border: "1px solid rgba(226,255,93,0.2)",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: "#e2ff5d",
                      textDecoration: "none", transition: "background 0.2s", whiteSpace: "nowrap",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(226,255,93,0.18)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(226,255,93,0.08)"}
                    >Code ↗</a>
                  )}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.category}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", lineHeight: 1.2 }}>{p.title}</div>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, flex: 1 }}>{p.desc}</p>
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "9px 12px", borderLeft: "2px solid rgba(226,255,93,0.4)" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(226,255,93,0.7)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>My Role</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{p.role}</div>
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                {p.stats.map((s, j) => (
                  <div key={j}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#e2ff5d" }}>{s.v}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {p.tech.map(t => (
                  <span key={t} style={{ background: "rgba(226,255,93,0.06)", border: "1px solid rgba(226,255,93,0.13)", borderRadius: 5, padding: "3px 8px", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  const [ref, vis] = useInView();
  return (
    <section id="education" ref={ref} style={{ padding: "80px 1.25rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Education</SectionLabel>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", marginBottom: 36, letterSpacing: "-1px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
          Academic <span style={{ color: "#e2ff5d", fontStyle: "italic" }}>Background.</span>
        </h2>
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16, padding: "24px", maxWidth: 680,
          opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease 0.1s",
        }}>
          <div style={{ fontSize: 30, marginBottom: 14 }}>🎓</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(15px,3vw,20px)", color: "#fff", marginBottom: 6 }}>{EDUCATION.degree}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", marginBottom: 4 }}>{EDUCATION.college}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 18 }}>{EDUCATION.location} · {EDUCATION.period}</div>
          <div style={{ display: "inline-block", background: "rgba(226,255,93,0.1)", border: "1px solid rgba(226,255,93,0.25)", borderRadius: 8, padding: "6px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#e2ff5d", marginBottom: 18 }}>{EDUCATION.cgpa}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {EDUCATION.subjects.map(s => (
              <span key={s} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 10px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EMAILJS CONFIG ──────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function Contact() {
  const [ref, vis] = useInView();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (window.emailjs) return;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    document.head.appendChild(script);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!window.emailjs) { setErrorMsg("Email service not loaded. Try again."); setStatus("error"); return; }
    setStatus("loading");
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name, from_email: form.email,
        subject: form.subject || "Portfolio Inquiry",
        message: form.message, reply_to: form.email,
      });
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Something went wrong. Please email me directly at rjvi1771@gmail.com");
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, padding: "13px 16px", width: "100%",
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#fff", outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "80px 1.25rem", background: "rgba(255,255,255,0.015)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Contact</SectionLabel>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#fff", marginBottom: 14, letterSpacing: "-1px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
          Let's build <span style={{ color: "#e2ff5d", fontStyle: "italic" }}>something great.</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 40, opacity: vis ? 1 : 0, transition: "all 0.6s ease 0.1s" }}>
          I'm actively looking for full-stack and React developer roles in Bengaluru or remote. Reach out directly.
        </p>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 28, opacity: vis ? 1 : 0, transition: "all 0.6s ease 0.2s" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "✉️", label: "Email", val: "rjvi1771@gmail.com", href: "mailto:rjvi1771@gmail.com" },
              { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/rj-vijay-a60632217", href: "https://linkedin.com/in/rj-vijay-a60632217" },
              { icon: "🐙", label: "GitHub", val: "github.com/rjvi1771", href: "https://github.com/rjvi1771" },
              { icon: "📍", label: "Location", val: "Bengaluru · Open to Remote" },
              { icon: "📞", label: "Phone", val: "+91 63632 76991", href: "tel:+916363276991" },
            ].map((c, i) => (
              <a key={i} href={c.href || "#"} target={c.href && !c.href.startsWith("mailto") && !c.href.startsWith("tel") ? "_blank" : "_self"} rel="noreferrer" style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "14px 18px", display: "flex", gap: 12, alignItems: "center",
                textDecoration: "none", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(226,255,93,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              >
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{c.val}</div>
                </div>
              </a>
            ))}

          </div>
          <div>
            {status === "success" ? (
              <div style={{ background: "rgba(226,255,93,0.08)", border: "1px solid rgba(226,255,93,0.3)", borderRadius: 16, padding: "40px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: "#e2ff5d", marginBottom: 10 }}>Message Sent!</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 20 }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </div>
                <button onClick={() => setStatus("idle")} style={{ padding: "10px 24px", background: "transparent", color: "#e2ff5d", border: "1px solid rgba(226,255,93,0.4)", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500 }}>Send Another →</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ id: "name", placeholder: "Your Name", type: "text" }, { id: "email", placeholder: "Email Address", type: "email" }, { id: "subject", placeholder: "Subject (e.g. Hiring Inquiry)" }].map(f => (
                  <input key={f.id} type={f.type || "text"} placeholder={f.placeholder} required
                    value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "rgba(226,255,93,0.4)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                ))}
                <textarea placeholder="Your message..." required rows={5} value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "rgba(226,255,93,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                {status === "error" && (
                  <div style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.25)", borderRadius: 8, padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ff8080" }}>{errorMsg}</div>
                )}
                <button type="submit" disabled={status === "loading"} style={{
                  padding: "14px", background: status === "loading" ? "rgba(226,255,93,0.5)" : "#e2ff5d",
                  color: "#0a0a0a", borderRadius: 10, border: "none", cursor: status === "loading" ? "not-allowed" : "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15,
                  transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
                  onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {status === "loading" ? (
                    <><span style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#0a0a0a", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Sending...</>
                  ) : "Send Message →"}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(226,255,93,0.08)", border: "1px solid rgba(226,255,93,0.2)", borderRadius: 20, padding: "5px 14px", marginBottom: 14 }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#e2ff5d", textTransform: "uppercase", letterSpacing: "0.1em" }}>{children}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "24px 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#e2ff5d" }}>VJ.</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© Vijay RJ. Built with React.</span>
      <div style={{ display: "flex", gap: 16 }}>
        {[["LinkedIn", "https://linkedin.com/in/rj-vijay-a60632217"], ["GitHub", "https://github.com/rjvi1771"], ["Email", "mailto:rjvi1771@gmail.com"]].map(([l, h]) => (
          <a key={l} href={h} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#e2ff5d"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
          >{l}</a>
        ))}
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  useFavicon();
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    NAV_LINKS.forEach(l => { const el = document.getElementById(l.toLowerCase()); if (el) observer.observe(el); });
    const heroEl = document.getElementById("hero");
    if (heroEl) observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; color: #fff; }
        ::selection { background: rgba(226,255,93,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: rgba(226,255,93,0.3); border-radius: 4px; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Mobile (≤ 768px) ── */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .meta-row { grid-template-columns: repeat(2,1fr) !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Tablet (769px – 1024px) ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .meta-row { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
      <Navbar active={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}